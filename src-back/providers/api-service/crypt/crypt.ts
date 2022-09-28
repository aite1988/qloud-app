

export class cryptTS {



  encrypt(text,key)
  {
    text=btoa(JSON.stringify(text));
    let number=Math.floor(Math.random() * text.length);
    let looper=Math.floor(Math.random() * 4)+1;
    var front = text.substr(0,number);
    for(let i=0;i<looper;i++)
    {
      key=btoa(key);
    }

    var back = text.substr(number,text.length);

    return front+key+back;
  }

  decrypt(text,key)
  {
    let res;
    let textLength=text.length
    let encodeKey=key;
    for(let i=0;i<5;i++)
    {
      encodeKey=btoa(encodeKey);
      res=text.replace(encodeKey,"");
      if(res.length<textLength)
      {
        return (atob(res));
      }
    }


  }

}



