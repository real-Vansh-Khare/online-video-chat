
const xlog = (content: any, sideline?: string) => {
  if(process.env.NODE_ENV === 'PRODUCTION') {
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