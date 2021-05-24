export class details{
  rows:row[]=[];
}
interface cal{
    name:string;
    value:any;
}

class row{
cals:cal[]=[];
}

export function creatDetailsMod(doc:{name:string,value:any}[],numCal:number){
    let _details:details=new details();
    doc.forEach((e,index)=>{
      if(index%numCal==0)
      {
         _details.rows.push(new row());
      }
      _details.rows[_details.rows.length-1].cals.push(e);
    })
    return _details;
}