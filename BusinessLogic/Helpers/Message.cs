namespace BusinessLogic.Helpers;

public static class Message
{
    public static class VariableNames
    {
        public const string Id = "ID";
        public const string Length = "LENGHT";
    }

    public static class Success
    {
        public const string SUCCESS = "Se ha realizado la consulta exitosamente";

        public const string DATA_SUCCESSFULLY_OBTAINED = "Datos obtenidos exitosamente";

        public const string DOCUMENT_CREATED_SUCCESSFULLY = "Documento creado exitosamente";

        public const string DOCUMENT_CREATED_SUCESSFULLY_BY_ID = $"Documento creado exitosamente con el id: {VariableNames.Id}";

        public const string USER_AUTHENTICATED = "Usuario autenticado exitosamente";

        public const string USER_CREATED_SUCCESSFULLY = "Usuario creado exitosamente";

        public const string USER_INACTIVATE_SUCCESSFULLY = "Usuario inactivado exitosamente";

        public const string USER_UPDATED_SUCCESSFULLY = "Usuario actualizado exitosamente";

        public const string DOCUMENT_INACTIVATE_SUCCESSFULLY = "Registro inactivado exitosamente";

        public const string DOCUMENT_UPDATED_SUCCESSFULLY = "Registro actualizado exitosamente";

        public const string DOCUMENT_DELETED_SUCCESSFULLY = "Registro eliminado exitosamente";
    }

    public static class Error
    {
        public const string INVALID_RANGE_NUMBER = "El campo {0} debe estar entre {1} y {2}";

        public const string BRANCH_IS_INACTIVATED = "La sucursal se encuentra inactiva, solicite un cambio de sucursal en su usuario";

        public const string INCORRECT_PRODUCT_TYPE = "El campo de Type únicamente puede ser S (para servicios) o I (para productos)";

        public const string MAX_LENGTH_OVERRUN = "El campo {0} no debe superar los {1} caracteres";
        
        public const string FIELD_REQUIRED = "El campo {0} es obligatorio";

        public const string SOME_CATEGORY_NOT_FOUND = "Alguna de las categorías que ha ingresado no se encuentra en la base de datos";

        public const string USER_PASSWORD_MAX_LENGTH = "La contraseña debe tener una longitud máxima de 100 caracteres";

        public const string USER_FIRSTNAME_MAX_LENGTH = "El nombre de pila del usuario debe tener una longitud máxima de 100 caracteres";

        public const string USER_LASTNAME_MAX_LENGTH = "El apellido del usuario debe tener una longitud máxima de 100 caracteres";

        public const string USER_PASSWORD_REQUIRED = "Debe ingresar una contraseña";

        public const string USER_FIRSTNAME_REQUIRED = "Debe ingresar un nombre de pila del usuario";

        public const string USER_LASTNAME_REQUIRED = "Debe ingresar el apellido del usuario";

        public const string USERNAME_MAX_LENGTH = "El nombre de usuario debe tener una longitud máxima de 20 caracteres";

        public const string SESSION_NAME_NOT_FOUND = "Tu nombre de usuario no ha sido encontrado";

        public const string BRANCH_NOT_FOUND = "No tienes asignada ninguna sucursal";

        public const string EXCHANGE_RATE_NOT_FOUND = "No se ha encontrado la tasa del tipo de cambio";

        public const string INSUFFICIENT_DATA = "Datos insuficientes para completar la operación";

        public const string USER_NOT_FOUND = "El usuario no se ha encontrado";

        public const string USERNAME_EMPTY = "Se debe ingresar un nombre de usuario";

        public const string PASSWORD_EMPTY = "Se debe ingresar una contraseña";

        public const string USERNAME_PASSWORD_INVALID = "Usuario o contraseña inválidos";

        public const string PASSWORD_INVALID = "La contraseña ingresada es incorrecta";

        public const string USER_DATA_EMPTY = "Los datos del usuario están vacíos";

        public const string USER_EXIST = "El usuario ya existe";

        public const string USER_INACTIVATE = "La cuenta ha sido desactivada";

        public const string DOCUMENT_EXIST = "El documento ya existe";

        public const string DOCUMENT_NOT_FOUND = "El documento no se ha encontrado";

        public const string INTERNAL_SERVER_ERROR = "Ha ocurrido un error en el servidor";

        public const string ID_REQUIRED = "El id es necesario para completar la operación";

        public const string PURCHASE_OUT_STOCK = "El stock existente es menor a la compra que desea anular";
    }
}