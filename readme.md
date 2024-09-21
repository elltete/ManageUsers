## Aplicacion | Gestión de Usuarios

Instalacion: ejecutar npm install, ya que se utiliza la libreria dotenv.

A continuacion se detalla las funcionalidad que el usuario puede utilizar, y cual es el proceso interno de cada una.

## Ruta: models.js

- **HELP**
Modo de uso: node index.js help
Detalla por pantalla todos comandos disponibles para utilizar la aplicacion

- **GET ALL DATA USERS**
Modo de uso: node index.js getUsers
Lista toda la informacion de cada usuario en la base de usuarios. En caso que no exista el archivo de usuarios, lo genera.
Devuelve un array con todo el contenido del archivo.

- **GET COMPACT DATA USERS**
Modo de uso: node index.js getInfoUsers
Muestra informacion compacta de cada usuario en la base de usuarios.

- **GET USER BY ID OR EMAIL**
Modo de uso: node index.js getUsersBy "id or email"
Muestra informacion compacta del usuario segun el id o email informado.
Valida que se ingrese el dato (id o email) de busqueda, y si el usuario existe en el archivo de datos.

- **ADDUSER**
Modo de uso: node index.js addUser "firstName" "lastName" "email" "password"
Da de alta un nuevo usuario en la base de usuarios.
Valida que se ingresen todos los datos necesarios, que el email tenga un formato valido, y que no exista otro usuario en a base con el mismo email.

- **UPDATEUSER**
Modo de uso: node index.js updateUser "id or email" "firstName" "lastName" "email" "password"
Modifica informacion del usuario indicado segun su id o email.
Valida que se ingresen todos los datos necesarios, que el email tenga un formato valido, y que no exista otro usuario en a base con el mismo email.
El ID no se modifica. Si la contraseña a modificr es la misma, no se actualiza.

- **CHANGE STATUS LOGGIN**
Modo de uso: node index.js changeStatusLoggIn "email"
Modifica el estado de la propiedad logged del usuario indicado por su email.
Valida que el email imgresado tenga un formato valido.

- **CHANGE USER PASSWORD**
Modo de uso: node index.js changePassword "email" "currentPassword" "newPassword"
Modifica el password del usuaro, validando que la contraseña ingresada se la correcta para dicho usuario indicado por su email.

- **LOGIN**
Modo de uso: node index.js login "email" "password"
Verifica que el usuario y password ingresado sean correctos segun la informacion en la base de usuarios. Modifica el estado de la propiedad logged del usuario.

- **DELETE USER**
Modo de uso: node index.js deleteUser "id or email"
Elimina de la base el usuario indicado segun se indique el id o el email

**Estructura del user**
id: UUID
firstName: text
lastName: text
email: text
password: text encrypt
isLoggedIn: boolean

## Ruta: utils/createObjectUser.js

- **createNewUserObject**
Devuelve un objeto para utilizarlo en la creacion de un usuario.

- **createUpdateUserObject**
Devuelve un objeto para utilizarlo en la modificacion de un usuario.

- **validateEmail**
Valida que el texto recibo tenga un formato valido de una direccion de email.

- **hashPassword**
Transforma un texto recibido en un conjunto de caracteres utilizando criptografia.

- **compareHashPassword**
Compara que dos valores criptograficos.

- **createChangePasswordUserObject**
Devuelve un objeto para utilizarlo en la modificacion de la contraseña de un usuario.

- **createLoginUserObject**
Devuelve un objeto para utilizarlo en el preoceso de login de un usuario.


## Ruta: utils/handleError.js

- **handleError**
Funcion que recibe un objeto Error y la ruta de un archivo, y escribe en el archivo informacion del Error.
Si no existe el archivo lo genera.
Se utiliza para guardar errores y validaciones en el uso de la aplicacion, y mensajes que hacen referencia a ABM de usuarios.

#######################################
