import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Students from './components/Students';
import Studentview from './components/Studentview';
import Createstudent from './components/Createstudent';
import Studentedit from './components/Studentedit';
import Teachers from './components/Teachers';
import CreateTeacher from './components/CreateTeacher';
import TeachersView from './components/TeachersView';
import Teachersedit from './components/Teachersedit';
function App() {
  return (
    
  <BrowserRouter>
    <div id="wrapper">
      <Sidebar/>
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <Topbar/>
          <div className='container-fluid'>
          <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/students" element={<Students/>}/>
          <Route path="/students/create" element={<Createstudent/>}/>
          <Route path="/students/view/:studentId" element={<Studentview/>}/>
          <Route path="/students/edit/:studentId" element={<Studentedit />}/>
          <Route path="/teachers" element={<Teachers/>}/>
          <Route path="/teachers/create" element={<CreateTeacher/>}/>
          <Route path="/teachers/view/:teacherId" element={<TeachersView/>}/>
          <Route path="/teachers/edit/:teacherId" element={<Teachersedit />}/>
          </Routes>
            </div>
          </div>
        </div>
      </div>
      </BrowserRouter>
  );
}
export default App;
