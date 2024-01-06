import './style.scss'; 


type Props ={
  isOpen: boolean;
  handleToggle: ()=> void
}

const MenuIcon = ({
    isOpen= false,
    handleToggle
}: Props) => {


  return (
    <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
      <div className="line line1"></div>
      <div className="line line2"></div>
      <div className="line line3"></div>
    </div>
  );
};

export default MenuIcon;
