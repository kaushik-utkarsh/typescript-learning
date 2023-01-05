import express from "express";
import { PrismaClient } from "@prisma/client";
import logger from "morgan";
import { arrayBuffer } from "stream/consumers";
// import logger from "morgan";
const app = express();

const prisma = new PrismaClient();
const PORT = 5000;

app.use(logger("dev"));

app.use(express.json());
const unix = require("unix-timestamp");

app.get("/", (req, res) => {
  console.log(req.body);
  let obj = {
    first_name: "Utkarsh",
    second_name: "Kaushik",
    technology: "Node JS",
    city: "Chennai",
  };
  res.send(obj);
});

// ********************* CRUD API's (Insert One) *********************//
app.post("/insert_one", async (req, res) => {
  try {
    let name: string = req.body.name;
    let email: string = req.body.email;
    let phone_number: number = req.body.phone_number;
    let pwd: string = req.body.pwd;
    // let user_id:number;
    // let random = Math.random()*100
    // user_id = random
    // console.log(user_id)

    if (req.body.name == "" || req.body.name == undefined) {
      return res.send({
        status: 403,
        message: "please enter name",
        data: "",
      });
    }
    if (req.body.phone_number == "" || req.body.phone_number == undefined) {
      return res.send({
        status: 403,
        message: "please enter last name",
        data: "",
      });
    }
    if (req.body.email == "" || req.body.email == undefined) {
      return res.send({
        status: 403,
        message: "please enter email",
        data: "",
      });
    }
    if (req.body.pwd == "" || req.body.pwd == undefined) {
      return res.send({
        status: 403,
        message: "please enter pwd",
        data: "",
      });
    }
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        // user_id,
        pwd,
        number_relation: {
          create: {
            phone_number,
          },
        },
      },
    });
    // const new_phone = await prisma.number_relation.create({
    //   data: {
    //     phone_number
    //   },
    // });

    if (!newUser) {
      return res.status(400).send({
        data: "",
        message: "no DB found",
      });
    }

    return res.status(201).send({
      status: 1,
      message: "Query Executed Sucessfully",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).send({
      status: 0,
      message: err,
      data: "",
    });
  }
});

// ********************* CRUD API's (Insert Many) *********************//

app.post("/insert_many", async (req, res) => {
  try {
    let data: any = req.body.data;
    let phone_number;
    data.map((phone_number:object, name:object, pwd:object)=>{ 

      console.log(phone_number, name)
    
    });
    // for (let i in data) {
      // const newUser = await prisma.users.create({
      //   data:{
      //     data[i],
      //     number_relation: {
      //       create: {
      //         data[i].phone_number,
      //       },
      //     },
      //   },
      //   // skipDuplicates: true,
      // });


  //     console.log(data[i]);
  // }
    // let item: any;
    // const data_items = data.map((item) => {
    //   const container: any = {};

    //   container[item.phone_number] = item.phone_number;

    //   return container;
    // });
 return
    const newUser = await prisma.users.create({
      data,
      // skipDuplicates: true,
    });

    if (!newUser) {
      return res.status(400).send({
        data: "",
        message: "no DB found",
      });
    }

    return res.status(201).send({
      status: 1,
      message: "Query Executed Sucessfully",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).send({
      status: 0,
      message: err,
      data: "",
    });
  }
});

// ********************* CRUD API's (Update One) *********************//

// app.post("/update_one", async (req, res) => {
//   try {
//     let data: any = req.body.data;
//     let phone_number:number = req.body.phone_number;
//     // const newUser = await prisma.users.update({
//     //   where: { user_id },
//     //   data,
//     // });

//     // if (!newUser) {
//       return res.status(400).send({
//         data: "",
//         message: "no DB found",
//       });
//     }

//     return res.status(201).send({
//       status: 1,
//       message: "Query Executed Sucessfully",
//       // data: newUser,
//     });
//   } catch (err) {
//     return res.status(500).send({
//       status: 0,
//       message: err,
//       data: "",
//     });
//   }
// });

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
});
function createError(arg0: number): any {
  throw new Error("Function not implemented.");
}

app.listen(PORT, () =>
  console.log(`The server is runnning at localhost:${PORT}`)
);
