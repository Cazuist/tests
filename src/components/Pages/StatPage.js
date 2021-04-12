export default function StatPage(props) {
  const { stats } = props;

  return (
    <>
    <h1>StatPage</h1>
    <p>{`Запуск от ${stats.launch}`}</p>    
    </>
  );
}