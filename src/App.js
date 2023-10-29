import { Provider } from "react-redux";
import "./App.css";
import Body from "./components/Body";
import Head from "./components/Head";
import store from "./utils/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";

function App() {
  return (
    <Provider store={store}>
      <div className="max-h-screen flex flex-col bg-neutral-900">
        <Head />
       <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

const appRouter = createBrowserRouter([
  {
    path : '/',
    element : <Body />,
    children: [
      {
        path: '/',
        element: <MainContainer />
      },
      {
        path: '/watch',
        element: <WatchPage />
      }
    ]
  }
])

export default App;

/*

*Head
*Body
* SidBar
*   MenuIteams
* MainContainer
*   ButtonList
*   VideoContainer
*   VideoCard 

*/
