const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="h-[56px] shrink-0 w-full bg-[#E1E7FF] flex items-center justify-center mt-auto">
      <p className="text-primary text-foot2 font-sans text-xs font-normal text-center ">
        Copyright &copy; {date} Skillshore
      </p>
    </footer>
  );
};

export default Footer;
