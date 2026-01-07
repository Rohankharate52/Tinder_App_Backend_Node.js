     const adminAuth = (req,res,next) =>{
    console.log("Admin auth is getting chekck");
    const token ="xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized){
        res.status(401).send("unauthroer req");
    }else {
        next();
    }
  };

  const userAuth = (req,res,next) =>{
    console.log("Admin auth is getting chekck");
    const token ="xyz";
    const isAdminAuthorized = token === "xyz";
    if (!isAdminAuthorized){
        res.status(401).send("unauthroer req");
    }else {
        next();
    }
  };

  module.exports- {
    adminAuth,
    userAuth,
  }