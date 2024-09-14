Aplicacion | Gestión de Usuarios

A continuacion se detalla las funcionalidad que se implementaron, y como funcionan 

- HELP
Modo de uso: node index.js help
Muestra informacion de los comandos disponibles.

- GET ALL DATA USERS
Modo de uso: node index.js getUsers
Muestra toda la informacion de cada usuario en la basa de usuarios. Utilizarla con precaucion, ya que muestra la password hasheada

- GET COMPACT DATA USERS
Modo de uso: node index.js getInfoUsers
Muestra informacion compacta de cada usuario en la basa de usuarios. 

- GET USER BY ID
Modo de uso: node index.js getUsersById "id"
Muestra informacion compacta del usuario segun el id informado.

- GET USER BY EMAIL
Modo de uso: node index.js getUsersByEmail "email"
Muestra informacion compacta del usuario segun el email informado.

- ADDUSER
Modo de uso: node index.js addUser "firstName" "lastName" "email" "password"
Da de alta un nuevo usuario en la base de usuarios, validando que el email sea unico.

- UPDATEUSER
Modo de uso: node index.js updateUser "id or email" "firstName" "lastName" "email" "password"
Modifica informacion del usuario indicado segun su id o email.

- CHANGE STATUS LOGGIN
Modo de uso: node index.js changeStatusLoggIn "id or email"
Modifica el estado de la propiedad logged del usuario indicado por su id o email.

- LOGIN
Modo de uso: node index.js login "email" "password"
Verifica que el usuario y password ingresado sean correctos segun la informacion en la base de usuarios. Se responde que algunos de los datos ingresados son invalidos, o que el acceso fue exitoso.

- DELETE USER
Modo de uso: node index.js deleteUser "id or email"
Elimina de la base el usuario indicado segun se indique el id o el email


Estructura del user
id: UUID
firstName: text
lastName: text
email: text unico
password: texto encriptado
isLoggedIn: boolean

-----------------------------

3. Métodos:

    ○ Mostrar Usuario por ID: Busca y devuelve un usuario específico por su id.
    ○ Agregar Usuario: Agrega un nuevo usuario. Debe validar que el email no esté repetido y hashear la contraseña antes de guardarla.
    ○ Modificar Usuario: Permite modificar los datos de un usuario (nombre,apellido, email, o password). El id no puede cambiar. Debe hashear la nueva contraseña si es que se modifica.
    ○ Eliminar Usuario: Elimina un usuario específico por su id.

4. Validaciones:
    ○ Asegúrate de que todos los campos obligatorios estén presentes antes de agregar o modificar un usuario.
    ○ El email debe ser único entre los usuarios.
    ○ La contraseña no debe guardarse en texto plano, debe estar hasheada.

Ver de generar dos archivos
El de Errores y el de Logueo