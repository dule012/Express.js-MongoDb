import server from "../server.js";
import chai from "chai";
import chaiHttp from "chai-http";
import Posts from "../models/posts/index.js";
import Users from "../models/users/index.js";
import Networks from "../models/networks/index.js";
import Tags from "../models/tags/index.js";

chai.should();
chai.use(chaiHttp);

describe("Clear db", () => {
  beforeEach((done) => {
    [Posts, Users, Networks, Tags].forEach((item) =>
      item.remove({}, (err) => done())
    );
  });
});

describe("/GET posts", () => {
  it("it should GET all the posts", (done) => {
    chai
      .request(server)
      .get("/api/posts")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMUBnbWFpbC5jb20iLCJpYXQiOjE2ODU2NTgyMjgsImV4cCI6MTY4ODI1MDIyOH0.g3t-9SV8WLCawq8dYs0doQnOdGNCSn_Snj1k5gbaUSg"
      )
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("error");
        res.body.should.have
          .property("message")
          .eql("Successfully returned posts.");
        res.body.should.have.property("data");
        done();
      });
  });
});

describe("/POST posts", () => {
  it("it should POST create post ", (done) => {
    let post = {
      content: "The Lord of the Rings",
      type: "ordinary",
      network: "tiktok",
    };
    chai
      .request(server)
      .post("/api/posts")
      .set(
        "Authorization",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMUBnbWFpbC5jb20iLCJpYXQiOjE2ODU2NTgyMjgsImV4cCI6MTY4ODI1MDIyOH0.g3t-9SV8WLCawq8dYs0doQnOdGNCSn_Snj1k5gbaUSg"
      )
      .send(post)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("error");
        res.body.should.have
          .property("message")
          .eql("Successfully created post.");
        done();
      });
  });
});

describe("/PUT/:postId posts", () => {
  it("it should UPDATE a post given the postId", (done) => {
    let post = new Posts({
      content: "The Chronicles of Narnia",
      type: "ordinary",
      network: "tiktok",
    });
    post.save().then((newPost) => {
      chai
        .request(server)
        .put("/api/posts/" + newPost._id)
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMUBnbWFpbC5jb20iLCJpYXQiOjE2ODU2NTgyMjgsImV4cCI6MTY4ODI1MDIyOH0.g3t-9SV8WLCawq8dYs0doQnOdGNCSn_Snj1k5gbaUSg"
        )
        .send({
          content: "The Chronicles of Narnia",
          type: "important",
          network: "tiktok",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("error");
          res.body.should.have
            .property("message")
            .eql("Successfully updated post.");
          done();
        });
    });
  });
});

describe("/DELETE/:postId post", () => {
  it("it should DELETE a post given the postId", (done) => {
    let post = new Posts({
      content: "The Chronicles of Narnia",
      type: "important",
      network: "tiktok",
    });
    post.save().then((newPost) => {
      chai
        .request(server)
        .delete("/api/posts/" + newPost._id)
        .set(
          "Authorization",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMUBnbWFpbC5jb20iLCJpYXQiOjE2ODU2NTgyMjgsImV4cCI6MTY4ODI1MDIyOH0.g3t-9SV8WLCawq8dYs0doQnOdGNCSn_Snj1k5gbaUSg"
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("error");
          res.body.should.have
            .property("message")
            .eql("Successfully deleted post.");
          done();
        });
    });
  });
});
