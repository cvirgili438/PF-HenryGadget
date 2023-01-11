1 COMPONENTE DashboardUser)Bueno, la cosa es asi,en la carpeta Principal tienen el inicio del flow, aca se obtiene el token
y se obtiene los estados de address 
se actualizan los estados de los usuarios forzozamente porque la pagina no lo hace bien( otros componentes actualizan mal los estados de usuarios asi que lo force a que lo actualice bien )
luego a las tablas se le pasa como props el token, las address del usuario y las propiedades del usuario tambien;


2 BasicTabs/ Tabs.jsx) el flow sigue en el componente Tabs al cual se le paso las propiedades del componente DashboardUser.jsx del principal
Como primera instancia, se setea un Modal, que se abre cuando se hace click en un boton " Create New Address" 
en este componente Tabs, tambien se divide en 2 partes, una tabla adecuada a Profile y otra a Addresses.
la tabla  addresses comenzara en la linea de codigo 101;


3Addresses)Aqui, si el usuario no tiene ninguna Address ligada a la cuenta solo renderisa el boton, pero si tiene una Address o mas, ligada a la cuenta Renderisa el componente o los componentes, Addresses en la lina de codigo 110 
Aqui se usa un componente de Material UI para dividir el titulo ( nombre de la Address) y el Componente AddressForm el cual es el formulario.;


4 AddressForm)A este formulario se le pasa como Props los estados del Switch de Material UI, para activar o desactivar la propiedad "disabled" para poder editar o no la address.
Aqui adentro esta los dispatch de los TextField

-------------------------------------------------------------------;


En el Tabs/BasicTabs, sigue la parte de la tabla de Profile, 
Aqui se renderisa el componente ProfileForm, con un ternario, si es editable o no 
Y luego aqui se renderisa un ProfileFormGoogle o UploadImage Dependiendo si el usuario esta logueado con cuenta de 3ro ( google) o solamente con la DB 