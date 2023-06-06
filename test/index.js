import server from "../server.js";
import chai from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import Posts from "../models/posts/index.js";
import Users from "../models/users/index.js";
import Networks from "../models/networks/index.js";
import Tags from "../models/tags/index.js";

chai.should();
chai.use(chaiHttp);

const adminData = {
  username: "asdasda",
  email: "nesto1@gmail.com",
  password: "oksad",
  role: "admin",
};
const userData = {
  username: "sdfsf",
  email: "nesto2@gmail.com",
  password: "oksad",
  role: "user",
};

const postData = {
  content: "The Chronicles of Narnia",
  type: "ordinary",
  network: "tiktok",
};

const createUser = async (data) => {
  const user = new Users(data);
  const found = await Users.findOne({ email: data.email });
  return !found ? user.save() : user;
};

const createPost = async (data) => {
  const post = new Posts(data);
  return post.save();
};

const token = (email) =>
  jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

describe("Clear db", () => {
  beforeEach((done) => {
    [Posts, Users, Networks, Tags].forEach((item) =>
      item.remove({}, (err) => done())
    );
  });
});

//----------------------------------------------------------------------------------------------------
// =============== POSTS

describe("/GET posts", () => {
  it("it should GET all the posts", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);

      const res = await chai
        .request(server)
        .get("/api/posts")
        .set("Authorization", token(user.email));

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
  it("it should POST to create post ", (done) => {
    const post = {
      content: "The Lord of the Rings",
      type: "ordinary",
      network: "tiktok",
    };

    Promise.resolve().then(async () => {
      const user = await createUser(adminData);
      const res = await chai
        .request(server)
        .post("/api/posts")
        .set("Authorization", token(user.email))
        .send(post);

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
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);
      const post = await createPost(postData);
      const res = await chai
        .request(server)
        .put("/api/posts/" + post._id)
        .set("Authorization", token(user.email))
        .send({ ...postData, type: "important" });

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully updated post.");
      done();
    });
  });
});

describe("/DELETE/:postId posts", () => {
  it("it should DELETE a post given the postId", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);
      const post = await createPost(postData);
      const res = await chai
        .request(server)
        .delete("/api/posts/" + post._id)
        .set("Authorization", token(user.email));

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully deleted post.");
      done();
    });
  });
});

describe("/POST like posts", () => {
  it("it should POST to like post ", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(userData);
      const post = await createPost(postData);
      const res = await chai
        .request(server)
        .post("/api/posts/like/" + post._id)
        .set("Authorization", token(user.email));

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have.property("message").eql("Successfully liked post.");
      done();
    });
  });
});

//---------------------------------------------------------------------------------------------------
