import Header from '../../components/header'

var dummytext = [];
for(var i = 0; i < 1000; i++) {
  dummytext.push("OIAWEFOAIWJEF\n");
}

export default function Home({router}) {
    return (
      <div>
        <Header router={router}/>
        {
          dummytext.map((item,id) => (
            <a key={id}>{item}</a>
          ))
        }
      </div>
    )
  }