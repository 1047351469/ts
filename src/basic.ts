let age:number=20
let username:string="cai"
let isLoading:boolean=false
let nullValue:null=null
let undefinedValue:undefined=undefined
let numberArr:number[]=[1,2,3]
let strOrNumberArr:(string|number)[]=["cai",12]
type strOrNumberArrAlias=(string|number)[]
let alias:strOrNumberArrAlias=["cai",12]
let count1:10
let obj:any="any"
function add(a:number,b:number):number{
    return a+b
}
let addArrow=(a:number,b:number):number=>{
    return a+b
}
type addFn=(a:number,b:number)=>number
let add1:addFn=(a,b)=>{
    return a*b
}
function buildName(firstName:string,lastName?:string){
    if(lastName){
        return `${firstName} ${lastName}`
    }
    return firstName
}
function eachArr(arr:number[]):void{
    arr.forEach((item,index)=>{
        console.log(item,index)
    })
}
interface Person{
    name:string,
    age:number
}
const p:Person={
    name:"cai",
    age:20
}
interface GoodsType{
    id:string,
    price:number
}
interface DisGoodsType extends GoodsType{
  disPrice:number
}
type _GoodsType={
    id:string,
    price:number
}
type _DisGoodsType=_GoodsType & {disPrice:number}
type Buttons={
    type:"primary"|"success"|"danger"|"warning"
}
let button:Buttons={type:"success"}

type APIResponse<T> = {
    code: number;
    message: string;
    data: T | null;
  };
  
  type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
  };
  
  
  const fakeAPI = <T>(url: string, payload: T): Promise<APIResponse<T>> => {
    console.log(`📡 发送请求: ${url}`);
    console.log(`📦 传输数据:`, payload);
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.1;
        if (isSuccess) {
          resolve({
            code: 200,
            message: "请求成功",
            data: payload, 
          });
        } else {
          reject({
            code: 500,
            message: "服务器错误，请稍后再试",
            data: null,
          });
        }
      }, 2000); // 模拟 2 秒延迟
    });
  };
  
  const submitProduct = async () => {
    const product: Product = {
      id: Date.now(),
      name: "MacBook Pro 16",
      price: 2399,
      stock: 10,
    };
  
    try {
      const response = await fakeAPI<Product>("https://api.example.com/products", product);
      console.log(`✅ API 响应:`, response);
    } catch (error) {
      console.error(`❌ API 失败:`, error);
    }
  };
  
  submitProduct();