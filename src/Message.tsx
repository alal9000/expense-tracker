let count = 0;


const Message = () => {
  console.log('message called', count);
  
  count++;
  return (
    <div>Message {count}</div>
  )
}

export default Message