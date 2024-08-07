import { BrowserRouter } from 'react-router-dom';
import {
    About,
    Contact,
    Experience,
    Feedbacks,
    Hero,
    Navbar,
    Tech,
    StarsCanvas
} from './components';
import { Toaster } from 'react-hot-toast';

const App = () => {
    return (
        <BrowserRouter>
            <div className="relative z-0 bg-primary">
                <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                    <Navbar />
                    <Hero />
                </div>
                <About />
                <Experience />
                <Tech />
                <Feedbacks />
                <div className="relative z-0">
                    <Contact />
                    <StarsCanvas />
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                        toastOptions={{
                            duration: 3000,
                            style: { background: '#363636', color: '#fff' }
                        }}
                    />
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
