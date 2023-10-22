
import ReactDOM from 'react-dom/client'
import router from './router';

import {RouterProvider} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
