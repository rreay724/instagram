export function seedDatabase(firebase) {
  // const users = [
  //   {
  //     userId: "FMHpDQ4wHteNQtJYfVMo7HNOtzu2",
  //     username: "bobby",
  //     fullName: "Bobby Reay",
  //     emailAddress: "rreay724@gmail.com",
  //     following: ["2"],
  //     followers: ["2", "3", "4"],
  //     dateCreated: Date.now(),
  //   },
  //   {
  //     userId: "2",
  //     username: "kratos",
  //     fullName: "Kratos",
  //     emailAddress: "kratos@spartan.com",
  //     following: [],
  //     followers: ["9nMtlmlDHsbhnrNG16yPJlwbrFo1"],
  //     dateCreated: Date.now(),
  //   },
  //   {
  //     userId: "3",
  //     username: "cloud",
  //     fullName: "Cloud",
  //     emailAddress: "cloud@ff7.com",
  //     following: [],
  //     followers: ["9nMtlmlDHsbhnrNG16yPJlwbrFo1"],
  //     dateCreated: Date.now(),
  //   },
  //   {
  //     userId: "4",
  //     username: "snake",
  //     fullName: "Solid Snake",
  //     emailAddress: "snake@metalgear.com",
  //     following: [],
  //     followers: ["9nMtlmlDHsbhnrNG16yPJlwbrFo1"],
  //     dateCreated: Date.now(),
  //   },
  // ];

  // // eslint-disable-next-line prefer-const
  // for (let k = 0; k < users.length; k++) {
  //   firebase.firestore().collection("users").add(users[k]);
  // }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection("photos")
      .add(
        // {
        //   photoId: i,
        //   userId: "2",
        //   imageSrc: `/images/users/kratos/${i}.jpg`,
        //   caption: "Midgard",
        //   likes: [],
        //   comments: [
        //     {
        //       displayName: "snake",
        //       comment: "I've infiltrated that place before",
        //     },
        //     {
        //       displayName: "cloud",
        //       comment: "Looks like we could find some materia there.",
        //     },
        //   ],
        //   userLatitude: "37.0745°",
        //   userLongitude: "22.4303°",
        //   dateCreated: Date.now(),
        // },
        // {
        //   photoId: i,
        //   userId: "3",
        //   imageSrc: `/images/users/cloud/${i}.jpg`,
        //   caption: "Midgar",
        //   likes: [],
        //   comments: [
        //     {
        //       displayName: "snake",
        //       comment: "I've infiltrated that place before",
        //     },
        //     {
        //       displayName: "cloud",
        //       comment: "Looks like we could find some materia there.",
        //     },
        //   ],
        //   userLatitude: "37.0745°",
        //   userLongitude: "22.4303°",
        //   dateCreated: Date.now(),
        // },
        // {
        //   photoId: i,
        //   userId: "4",
        //   imageSrc: `/images/users/snake/${i}.jpg`,
        //   caption: "Fox Die",
        //   likes: [],
        //   comments: [
        //     {
        //       displayName: "snake",
        //       comment: "I've infiltrated that place before",
        //     },
        //     {
        //       displayName: "cloud",
        //       comment: "Looks like we could find some materia there.",
        //     },
        //   ],
        //   userLatitude: "37.0745°",
        //   userLongitude: "22.4303°",
        //   dateCreated: Date.now(),
        // },
        {
          photoId: i,
          userId: "FMHpDQ4wHteNQtJYfVMo7HNOtzu2",
          imageSrc: `/images/users/bobby/${i}.jpg`,
          caption: "M'lady",
          likes: [],
          comments: [
            {
              displayName: "snake",
              comment: "I've infiltrated that place before",
            },
            {
              displayName: "cloud",
              comment: "Looks like we could find some materia there.",
            },
          ],
          userLatitude: "37.0745°",
          userLongitude: "22.4303°",
          dateCreated: Date.now(),
        }
      );
  }
}
