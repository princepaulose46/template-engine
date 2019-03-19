const fs = require('fs')
function ren(filePath, options, callback) {
    fs.readFile(filePath, function (err, data) {
      if(err){
        return(callback(err))
    }
    data = data.toString()
    let keys = Object.keys(options)
    for(var i=0;i<keys.length;i++)
    {
        if(typeof(options[keys[i]]) === "string")
        {
            data = data.replace(new RegExp("{"+keys[i]+"}", 'igm'), options[keys[i]])
        }
    }
    let toReplace = ""
    const loopex = /%\w*%.*%/gm
    while((loop = loopex.exec(data))){
        loop[0]=loop[0].slice(1, loop[0].length-1)
        let blocks = loop[0].split("%")
        let loopdata = options[blocks[0]]
        let variables = blocks[1].match(/\$\w*\$/g)
        for(i=0;i<loopdata.length;i++){
            let add = blocks[1]
            for(j=0;j<variables.length;j++){
                console.log('variable', variables[j])
                let vartag = variables[j].slice(1, variables[j].length-1)
                if(loopdata[i][vartag]!== undefined)
                    {add = add.replace(variables[j], loopdata[i][vartag])
                    }
                else {
                    add = add.replace(variables[j], '')
                }
            }
            toReplace+=add
        }
            data = data.replace("%"+loop[0]+"%", toReplace)
            toReplace = ""
        }
    const rendered = data;
      return callback(null, rendered)
    })
  }
  module.exports = ren