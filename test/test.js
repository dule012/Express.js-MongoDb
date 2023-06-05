import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server.js";
import Posts from "../models/posts/index.js";
import Users from "../models/users/index.js";
import Networks from "../models/networks/index.js";
import Tags from "../models/tags/index.js";

const should = chai.should();
chai.should(chaiHttp);

describe("Posts", () => {
  beforeEach((done) => {
    [Posts, Users, Networks, Tags].forEach((item) =>
      item.remove({}, (err) => done())
    );
  });

  describe("/GET posts", () => {
    it("it should GET all the posts", (done) => {
      chai
        .request(server)
        .get("/api/posts")
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
    it("it should create post", (done) => {
      const post = {
        content: "The Lord of the Rings",
        type: "ordinary",
        network: "tiktok",
      };
      chai
        .request(server)
        .post("/api/posts")
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

  describe("/PUT/:id posts", () => {
    it("it should PUT post by postId", (done) => {
      const post = new Posts({
        content: "Harry Potter",
        type: "ordinary",
        network: "tiktok",
      });
      post.save((err, post) => {
        chai
          .request(server)
          .put("/api/posts/" + post._id)
          .send(post)
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

  describe("/DELETE/:id book", () => {
    it("it should DELETE a book given the id", (done) => {
      let book = new Book({
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        year: 1948,
        pages: 778,
      });
      book.save((err, book) => {
        chai
          .request(server)
          .delete("/book/" + book.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Book successfully deleted!");
            res.body.result.should.have.property("ok").eql(1);
            res.body.result.should.have.property("n").eql(1);
            done();
          });
      });
    });
  });
});
