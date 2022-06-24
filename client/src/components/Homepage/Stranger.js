import React from "react";
import { gun, user } from "../../useGun";

export default function Stranger() {
  const [stranger, setStranger] = React.useState([]);
  const [val, setVal] = React.useState([]);

  React.useEffect(() => {
    // get incoming message that's not from friends
    const getIncomingMessages = async () => {
      if ((await user.get("friends")) === undefined) {
        gun
          .get("chat")
          .map()
          .once(async (data) => {
            if (data.to === (await user.is.pub)) {
              console.log("masuk");
              setStranger((old) => [...old, data.from]);
              if (stranger.includes(data.from)) {
                console.log("udah ada");
              } else {
                console.log("ga ada");
              }
            }
          });
      } else {
      }
      // setStranger([]);
      // iterate chat graph
      // gun
      //   .get("chat")
      //   .map()
      //   .once(async (data) => {
      //     if (data.to === (await user.is.pub)) {
      //       console.log("masuk");
      //       if (!(await user.get("friends"))) {
      //         console.log("undf friend, ada ga?", stranger.includes(data.from));
      //         if (stranger.includes(data.from)) {
      //           console.log("udah ada");
      //         } else {
      //           setStranger((old) => [...old, data.from]);
      //         }
      //       } else {
      //         console.log("not undf");
      //       }
      //       //   await user
      //       //     .get("friends")
      //       //     .map()
      //       //     .once(async (e) => {
      //       //       console.log(e);
      //       //       if (data.to === e.slice(1)) {
      //       //         console.log("sama get from: ", data.from);
      //       //         if (!data.from === (await user.is.pub)) {
      //       //           console.log("dari orang");
      //       //           if (stranger.includes(data.from)) {
      //       //             console.log("ga ada di list ", stranger);
      //       //           } else {
      //       //             console.log("ada di list ", stranger);
      //       //           }
      //       //         } else {
      //       //           console.log("diri sendiri XX", data.from === user.is.pub);
      //       //         }
      //       //       } else {
      //       //         console.log("ini apaan");
      //       //       }
      //       //     });
      //       // }
      //     }
      //   });
    };
    getIncomingMessages();
  }, []);

  return (
    <div className="flex flex-col divide-y max-h-full overflow-y-auto scrollbar">
      {stranger.map((e) => {
        return (
          <div
            className="hover:bg-blue-100/50 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
            key={e.pub}
            onClick={() => {
              console.log(e);
            }}
          >
            <div className="flex items-center">
              <img
                className="inline-block h-14 w-14 rounded-full ring-2 ring-slate-100 bg-white mr-4"
                src={`https://avatars.dicebear.com/api/avataaars/${e}.svg`}
                alt=""
              />
              <div>
                <p className="text-black text-2xl">{e.slice(0, 10)}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// if (user.is.pub === data.to) {
//   const who = {
//     from: data.from,
//     to: data.to,
//   };
//   if (!stranger.includes(who)) setStranger((old) => [...old, who]);
// }

//       if (data.to === e.slice(1) || !data.from === await user.is.pub) {
//         console.log("dont", data.from, '||',e.slice(1));
//       } else {
//         console.log("do", data.from, e.slice(1));
//         if (!stranger.includes(data.from)) {
//           setStranger((old) => [...old, data.from]);
//         }
//       }
