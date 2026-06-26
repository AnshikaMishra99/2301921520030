export const sendLog = async (stack, level, packageName, message) => {
  try {
    console.log(`[${level.toUpperCase()}] [${packageName}] ${message}`);
  } catch (error) {
    // Fail-safe local log handling
  }
};






// export const sendLog = async (stack, level, packageName, message) => {
//   try {
//     await fetch("http://4.224.186.213/evaluation-service/logs", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": "Bearer 2301921520030"
//       },
//       body: JSON.stringify({
//         stack: stack.toLowerCase(),
//         level: level.toLowerCase(),
//         package: packageName.toLowerCase(),
//         message: message
//       })
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };