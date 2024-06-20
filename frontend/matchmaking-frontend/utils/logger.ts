
const xlog = (content: any, sideline?: string) => {
  if(process.env.NEXT_PUBLIC_ENV_MODE === 'PRODUCTION') {
    return;
  }

  console.log("----------------------------------------------")
  if(sideline) {
    console.log(sideline);
  }
  console.log(content);
  console.log("----------------------------------------------")
};

export default xlog;