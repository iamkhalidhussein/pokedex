import { Header } from "@/components/header/header";
import { Main } from "@/components/main/main";
import { Toaster } from 'react-hot-toast';

export const Layout = () => {
    return (
        <div className="container mx-auto my-3 md:px-0 px-2">
            <Toaster/>
            <Header/>
            <Main/>
        </div>
    )
};