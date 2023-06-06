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
  return !found ? user.save() : found;
};

const createPost = async (data) => {
  const post = new Posts(data);
  return post.save();
};

const token = (email) =>
  jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const networkData = { name: "tiktok" };

const createNetwork = async (data) => {
  const network = new Networks(networkData);
  const found = await Networks.findOne({ name: data.name });
  return !found ? network.save() : found;
};

const tagData = { name: "Sport" };

const createTag = async (data) => {
  const tag = new Tags(data);
  const found = await Tags.findOne({ name: data.name });
  return !found ? tag.save() : found;
};

describe("Clear db", () => {
  beforeEach((done) => {
    [Posts, Users, Networks, Tags].forEach((item) =>
      item.remove({}, (err) => done())
    );
  });
});

//----------------------------------------------------------------------------------------------------
// =============== POSTS

describe("/GET /api/posts", () => {
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

describe("/POST /api/posts", () => {
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

describe("/PUT /api/posts/:postId", () => {
  it("it should UPDATE a post given the postId", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);
      const post = await createPost(postData);
      const res = await chai
        .request(server)
        .put("/api/posts/" + post._id)
        .set("Authorization", token(user.email))
        .send({ network: "instagram" });

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully updated post.");
      done();
    });
  });
});

describe("/DELETE /api/posts/:postId", () => {
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

describe("/POST /api/posts/like/:postId", () => {
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

//----------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------
// =============== USERS

describe("/GET /api/users", () => {
  it("it should GET all the users", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);

      const res = await chai
        .request(server)
        .get("/api/users")
        .set("Authorization", token(user.email));

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully returned users.");
      res.body.should.have.property("data");
      done();
    });
  });
});

describe("/POST /api/users", () => {
  it("it should POST to create user ", (done) => {
    const newUser = {
      username: Math.random() + "",
      email: Math.random() + "@gmail.com",
      role: "user",
      password: "asdasd",
    };
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);
      const res = await chai
        .request(server)
        .post("/api/users")
        .set("Authorization", token(user.email))
        .send(newUser);

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully created user.");
      done();
    });
  });
});

describe("/PUT /api/users/:userId", () => {
  it("it should UPDATE a user given the userId", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);
      const res = await chai
        .request(server)
        .put("/api/users/" + user._id)
        .set("Authorization", token(user.email))
        .send({ password: "asdasd", role: "admin" });

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully updated user.");
      done();
    });
  });
});

describe("/DELETE /api/users/:userId", () => {
  it("it should DELETE a user given the userId", (done) => {
    Promise.resolve().then(async () => {
      const newUsers = await Promise.all([
        createUser({
          username: Math.random() + "",
          email: Math.random() + "@gmail.com",
          role: "user",
          password: "asdasd",
        }),
        createUser({
          username: Math.random() + "",
          email: Math.random() + "@gmail.com",
          role: "user",
          password: "asdasd",
        }),
      ]);
      const user = await createUser(adminData);
      await createPost({ ...postData, likes: newUsers });
      const res = await chai
        .request(server)
        .delete("/api/users/" + newUsers[0]._id)
        .set("Authorization", token(user.email));

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully deleted user.");
      done();
    });
  });
});

//----------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------
// =============== NETWORKS

describe("/GET /api/networks", () => {
  it("it should GET all the networks", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);

      const res = await chai
        .request(server)
        .get("/api/networks")
        .set("Authorization", token(user.email));

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully returned networks.");
      res.body.should.have.property("data");
      done();
    });
  });
});

describe("/POST /api/networks", () => {
  it("it should POST to create network ", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);
      const res = await chai
        .request(server)
        .post("/api/networks")
        .set("Authorization", token(user.email))
        .send({ name: Math.random() + "" });

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully created network.");
      done();
    });
  });
});

describe("/PUT /api/networks/:networkId", () => {
  it("it should UPDATE a network given the networkId", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);
      const network = await createNetwork(networkData);
      const res = await chai
        .request(server)
        .put("/api/networks/" + network._id)
        .set("Authorization", token(user.email))
        .send({ name: "tiktok" });

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully updated network.");
      done();
    });
  });
});

describe("/DELETE /api/users/:networkId", () => {
  it("it should DELETE a network given the networkId", (done) => {
    Promise.resolve().then(async () => {
      const network = await createNetwork(networkData);
      const user = await createUser(adminData);
      const res = await chai
        .request(server)
        .delete("/api/networks/" + network._id)
        .set("Authorization", token(user.email));

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully deleted network.");
      done();
    });
  });
});

//----------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------
// =============== TAGS

describe("/GET /api/tags", () => {
  it("it should GET all the tags", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);

      const res = await chai
        .request(server)
        .get("/api/tags")
        .set("Authorization", token(user.email));

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have
        .property("message")
        .eql("Successfully returned tags.");
      res.body.should.have.property("data");
      done();
    });
  });
});

describe("/POST /api/tags", () => {
  it("it should POST to create tag ", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);
      const res = await chai
        .request(server)
        .post("/api/tags")
        .set("Authorization", token(user.email))
        .send({ name: Math.random() + "" });

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have.property("message").eql("Successfully created tag.");
      done();
    });
  });
});

describe("/PUT /api/networks/:tagId", () => {
  it("it should UPDATE a tag given the tagId", (done) => {
    Promise.resolve().then(async () => {
      const user = await createUser(adminData);
      const tag = await createTag(tagData);
      const res = await chai
        .request(server)
        .put("/api/tags/" + tag._id)
        .set("Authorization", token(user.email))
        .send({ name: Math.random() + "" });

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have.property("message").eql("Successfully updated tag.");
      done();
    });
  });
});

describe("/DELETE /api/users/:tagId", () => {
  it("it should DELETE a tag given the tagId", (done) => {
    Promise.resolve().then(async () => {
      const tag = await createTag(tagData);
      const user = await createUser(adminData);
      const res = await chai
        .request(server)
        .delete("/api/tags/" + tag._id)
        .set("Authorization", token(user.email));

      res.should.have.status(200);
      res.body.should.have.property("error");
      res.body.should.have.property("message").eql("Successfully deleted tag.");
      done();
    });
  });
});

//----------------------------------------------------------------------------------------------------
