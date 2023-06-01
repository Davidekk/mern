import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {Error, Landing, Register, ProtectedRoute} from "../src/pages"
import {AllJob, AddJob, Stats, Profile, SharedLayout} from './pages/dashboard'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <SharedLayout/>
                    </ProtectedRoute>}>
                    <Route index element={<Stats/>}/>
                    <Route path="all-jobs" element={<AllJob/>}/>
                    <Route path="add-job" element={<AddJob/>}/>
                    <Route path="profile" element={<Profile/>}/>
                </Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/landing" element={<Landing/>}></Route>
                <Route path="*" element={<Error/>}></Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
