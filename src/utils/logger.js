export const sendLog = async (stack, level, packageName, message) => {
  try {
    const response = await fetch("http://4.224.186.213/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stack: stack.toLowerCase(),
        level: level.toLowerCase(),
        package: packageName.toLowerCase(),
        message: message
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Log dynamic connection success:", data.logID);
    }
  } catch (error) {
    console.error("Local logger catch block triggered:", error);
  }
};