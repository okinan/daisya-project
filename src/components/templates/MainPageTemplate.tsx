import Header from "../organisms/Header";
import Footer from "../organisms/Footer";

const MainPageTemplate = (props: any) => {
  return (
    <>
      <Header />
      {props.Page}
      <Footer />
    </>
  );
};

export default MainPageTemplate;
