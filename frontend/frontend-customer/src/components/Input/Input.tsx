import "./Input.css"

type InputContent = {
    name: string,
    type:string
    value:string | number,
    onChange: any
}
export function Input (inputContent: InputContent) {

    return (
        <><input name = {inputContent.name} type={inputContent.type} value={inputContent.value} onChange={()=> inputContent.onChange} required> {inputContent.name} </input><br/></>)
}