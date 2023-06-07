
const List = ({
  list,
}: {
  list: any[];
}): JSX.Element => {
  return (
    <div>
      <ul style={{margin: 0, padding: 0}}>
        {
          list.map((item, index) => {
            return (
              <li style={{
                borderBottom: '1px solid black',
                lineHeight: '50px',
              }} key={index}>id: {item.id}</li>
            )
          })
        }
      </ul>
    </div>
  )
};

export default List;
