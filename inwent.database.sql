IF DB_ID('Inwent') IS NOT NULL
BEGIN
  -- Si la base de datos existe, eliminarla
  USE master;
  ALTER DATABASE Inwent SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE Inwent;
  PRINT 'La base de datos Inwent ha sido eliminada.';
END
GO

CREATE DATABASE Inwent
GO
USE Inwent
GO

CREATE TABLE dbo.HistoricalExchangeRate (
	HistoricalExchangeRateId 	int IDENTITY(1,1) NOT NULL PRIMARY KEY,
	Date 											date NOT NULL,
	ExchangeRate 							decimal(18, 4) NOT NULL,
)

CREATE TABLE dbo.Branch ( 
	BranchId             varchar(5) NOT NULL    ,
	Name                 varchar(100) NOT NULL    ,
	Address              varchar(200)     ,
	Active               bit NOT NULL    ,
	Phone                varchar(15)     ,
	CONSTRAINT pk_Branch PRIMARY KEY  ( BranchId )
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla de sucursales del sistema' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Branch';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador único de la sucursal' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Branch', @level2type=N'COLUMN',@level2name=N'BranchId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Nombre de la sucursal' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Branch', @level2type=N'COLUMN',@level2name=N'Name';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Dirección de la sucursal' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Branch', @level2type=N'COLUMN',@level2name=N'Address';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Está la sucursal activa' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Branch', @level2type=N'COLUMN',@level2name=N'Active';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Número de teléfono de la sucursal' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Branch', @level2type=N'COLUMN',@level2name=N'Phone';

CREATE TABLE dbo.Category ( 
	CategoryId           int NOT NULL   IDENTITY ,
	Name                 varchar(100) NOT NULL    ,
	Description          varchar(100) NOT NULL    ,
	CONSTRAINT pk_Category PRIMARY KEY  ( CategoryId )
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla de categoría de producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Category';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador de categoría de producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Category', @level2type=N'COLUMN',@level2name=N'CategoryId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Nombre de la categoría' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Category', @level2type=N'COLUMN',@level2name=N'Name';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Breve descripción de la categoría de producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Category', @level2type=N'COLUMN',@level2name=N'Description';

CREATE TABLE dbo.Consecutive ( 
	ConsecutiveId        varchar(5) NOT NULL    ,
	Mask                 varchar(20) NOT NULL    ,
	Length               int NOT NULL    ,
	Consecutive          varchar(20) NOT NULL    ,
	CONSTRAINT Pk_Consecutive_ConsecutiveId PRIMARY KEY  ( ConsecutiveId )
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tablas de consecutivos' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Consecutive';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador del consecutivo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Consecutive', @level2type=N'COLUMN',@level2name=N'ConsecutiveId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Máscara del consecutivo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Consecutive', @level2type=N'COLUMN',@level2name=N'Mask';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Longitud del consecutivo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Consecutive', @level2type=N'COLUMN',@level2name=N'Length';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Consecutivo disponible. Actualizar una vez sea utilizado este consecutivo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Consecutive', @level2type=N'COLUMN',@level2name=N'Consecutive';

CREATE TABLE dbo.Invoice ( 
	InvoiceId            			varchar(5) NOT NULL    ,
	Date                 			datetime NOT NULL    ,
	Subtotal             			decimal(18,4) NOT NULL    ,
	Discount             			decimal(18,4) NOT NULL    ,
	Tax                  			decimal(18,4) NOT NULL    ,
	Total                			AS Subtotal - Discount + Tax ,
	Active               			bit NOT NULL    ,
	BranchId             			varchar(5) NOT NULL    ,
	HistoricalExchangeRateId 	INT NOT NULL FOREIGN KEY REFERENCES HistoricalExchangeRate(HistoricalExchangeRateId),
	CONSTRAINT pk_Invoice 		PRIMARY KEY  ( InvoiceId )
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla de encabezado de facturas' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Invoice';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador único de factura' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Invoice', @level2type=N'COLUMN',@level2name=N'InvoiceId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Fecha en la que se generó la factura' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Invoice', @level2type=N'COLUMN',@level2name=N'Date';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Suma del valor bruto de los productos' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Invoice', @level2type=N'COLUMN',@level2name=N'Subtotal';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Monto de descuento ofrecido al subtotal de esta factura' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Invoice', @level2type=N'COLUMN',@level2name=N'Discount';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Monto de impuesto aplicado al Subtotal - Discount' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Invoice', @level2type=N'COLUMN',@level2name=N'Tax';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Monto total a pagar por el cliente' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Invoice', @level2type=N'COLUMN',@level2name=N'Total';

CREATE TABLE dbo.Logs ( 
	Id                   int NOT NULL   IDENTITY ,
	Message              nvarchar(max)     ,
	MessageTemplate      nvarchar(max)     ,
	Level                nvarchar(max)     ,
	TimeStamp            datetime     ,
	Exception            nvarchar(max)     ,
	Properties           nvarchar(max)     ,
	Username             varchar(max)     ,
	CONSTRAINT PK_Logs PRIMARY KEY  ( Id )
 );

CREATE TABLE dbo.Product ( 
	ProductId            varchar(5) NOT NULL    ,
	Description          varchar(200) NOT NULL    ,
	Type                 char(1) NOT NULL    ,
	Barcode              varchar(100)     ,
	Price                decimal(18,4) NOT NULL    ,
	MinStock             int     ,
	PhotoUri             varchar(100)     ,
	Active               bit NOT NULL    ,
	CONSTRAINT pk_Product PRIMARY KEY  ( ProductId )
 );

ALTER TABLE dbo.Product ADD CONSTRAINT Cns_ProductType CHECK ( [Type]='S' OR [Type]='I' );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla de productos del sistema' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Product';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Product', @level2type=N'COLUMN',@level2name=N'ProductId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Breve descripción del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Product', @level2type=N'COLUMN',@level2name=N'Description';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tipo de producto. I - Artículo | S - Servicio' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Product', @level2type=N'COLUMN',@level2name=N'Type';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Código de barra asociado a este producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Product', @level2type=N'COLUMN',@level2name=N'Barcode';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Precio actual del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Product', @level2type=N'COLUMN',@level2name=N'Price';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Existencias mínimas del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Product', @level2type=N'COLUMN',@level2name=N'MinStock';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Dirección de la imagen del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Product', @level2type=N'COLUMN',@level2name=N'PhotoUri';

CREATE TABLE dbo.ProductCategory ( 
	ProductId            varchar(5) NOT NULL    ,
	CategoryId           int NOT NULL    ,
	CONSTRAINT pk_ProductCategory PRIMARY KEY  ( ProductId, CategoryId )
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla relacional de producto con categoría' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProductCategory';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProductCategory', @level2type=N'COLUMN',@level2name=N'ProductId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador de categoría de producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ProductCategory', @level2type=N'COLUMN',@level2name=N'CategoryId';

CREATE TABLE dbo.Role ( 
	IdRole               varchar(10) NOT NULL    ,
	Description          varchar(100) NOT NULL    ,
	Active               bit NOT NULL    ,
	CONSTRAINT Pk_Role_IdRole PRIMARY KEY  ( IdRole )
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla de roles del sistema' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Role';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador único de rol' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Role', @level2type=N'COLUMN',@level2name=N'IdRole';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Descripción del rol' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Role', @level2type=N'COLUMN',@level2name=N'Description';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Determina si el rol está activo o inactivo' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Role', @level2type=N'COLUMN',@level2name=N'Active';

CREATE TABLE dbo.Supplier ( 
	SupplierId           varchar(5) NOT NULL    ,
	Name                 varchar(100) NOT NULL    ,
	Phone                varchar(15)     ,
	Address              varchar(200) NOT NULL    ,
	Email                varchar(100) NOT NULL    ,
	Active               bit NOT NULL    ,
	CONSTRAINT pk_Supplier PRIMARY KEY  ( SupplierId )
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla de proveedores del sistema' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Supplier';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador del proveedor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Supplier', @level2type=N'COLUMN',@level2name=N'SupplierId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Nombre del proveedor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Supplier', @level2type=N'COLUMN',@level2name=N'Name';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Número telefónico del proveedor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Supplier', @level2type=N'COLUMN',@level2name=N'Phone';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Dirección del proveedor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Supplier', @level2type=N'COLUMN',@level2name=N'Address';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Correo electrónico del proveedor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Supplier', @level2type=N'COLUMN',@level2name=N'Email';

CREATE TABLE dbo.[User] ( 
	Username             varchar(20) NOT NULL    ,
	Password             varchar(100) NOT NULL    ,
	Firstname            varchar(100) NOT NULL    ,
	Lastname             varchar(100) NOT NULL    ,
	LastLogin            date     ,
	Active               bit NOT NULL    ,
	DefaultBranch        varchar(5)     ,
	CONSTRAINT pk_Tbl PRIMARY KEY  ( Username )
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla de usuarios del sistema' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Nombre identificador del usuario del sistema' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'Username';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Contraseña del usuario encriptada' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'Password';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Nombres de pila del usuario' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'Firstname';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Apellidos del usuario' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'Lastname';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Último inicio de sesión del usuario' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'LastLogin';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Estado activo del usuario' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'Active';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Sucursal que tomará el sistema por defecto al realizar las facturas o compras' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'User', @level2type=N'COLUMN',@level2name=N'DefaultBranch';

CREATE TABLE dbo.UserRole ( 
	[User]             varchar(20) NOT NULL    ,
	[Role]               varchar(10) NOT NULL    ,
	CONSTRAINT Idx_UserRole PRIMARY KEY  ( [User], [Role] )
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla relacional de roles de usuario' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserRole';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Nombre identificador del usuario del sistema' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserRole', @level2type=N'COLUMN',@level2name=N'User';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador único de rol' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'UserRole', @level2type=N'COLUMN',@level2name=N'Role';

CREATE TABLE dbo.Inventory ( 
	InventoryId          int NOT NULL IDENTITY,
	BranchId             varchar(5) NOT NULL    ,
	ProductId            varchar(5) NOT NULL    ,
	Stock                int NOT NULL    ,
	CONSTRAINT pk_Inventory PRIMARY KEY  ( InventoryId ),
	CONSTRAINT Idx_Inventory UNIQUE ( BranchId, ProductId ) 
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla de inventario de productos de cada una de las sucursales' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Inventory';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador de la relación producto - sucursal' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Inventory', @level2type=N'COLUMN',@level2name=N'InventoryId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador único de la sucursal' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Inventory', @level2type=N'COLUMN',@level2name=N'BranchId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Inventory', @level2type=N'COLUMN',@level2name=N'ProductId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Existencias del producto en la sucursal establecida' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Inventory', @level2type=N'COLUMN',@level2name=N'Stock';

CREATE TABLE dbo.InvoiceDetail ( 
	InvoiceId            varchar(5) NOT NULL    ,
	ProductId            varchar(5) NOT NULL    ,
	Quantity             int NOT NULL    ,
	UnitPrice            decimal(18,4) NOT NULL    ,
	Subtotal             AS ([UnitPrice]*[Quantity]) ,
	CONSTRAINT pk_InvoiceDetail PRIMARY KEY  ( InvoiceId, ProductId )
 );

ALTER TABLE dbo.InvoiceDetail ADD CONSTRAINT Cns_InvoiceDetailQuantity CHECK ( [Quantity]>(0) );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla de detalle de una factura' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'InvoiceDetail';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador único de factura' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'InvoiceDetail', @level2type=N'COLUMN',@level2name=N'InvoiceId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'InvoiceDetail', @level2type=N'COLUMN',@level2name=N'ProductId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Cantidad de producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'InvoiceDetail', @level2type=N'COLUMN',@level2name=N'Quantity';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Precio unitario del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'InvoiceDetail', @level2type=N'COLUMN',@level2name=N'UnitPrice';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Cantidad a pagar por la cantidad de este producto en esta compra' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'InvoiceDetail', @level2type=N'COLUMN',@level2name=N'Subtotal';

CREATE TABLE dbo.Purchase ( 
	PurchaseId           varchar(5) NOT NULL    ,
	SupplierInvoiceId    varchar(10) NOT NULL    ,
	Date                 datetime NOT NULL    ,
	Subtotal             decimal(18,4) NOT NULL    ,
	Discount             decimal(18,4) NOT NULL    ,
	Tax                  decimal(18,4) NOT NULL    ,
	SupplierId           varchar(5) NOT NULL    ,
	Active               bit NOT NULL    ,
	BranchId             varchar(5) NOT NULL    ,
	CONSTRAINT pk_Purchase PRIMARY KEY  ( PurchaseId )
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla de compras de productos' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Purchase';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador de compra del sistema' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Purchase', @level2type=N'COLUMN',@level2name=N'PurchaseId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador de la factura del proveedor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Purchase', @level2type=N'COLUMN',@level2name=N'SupplierInvoiceId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Fecha de la compra' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Purchase', @level2type=N'COLUMN',@level2name=N'Date';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Monto a pagar sin impuestos ni descuento' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Purchase', @level2type=N'COLUMN',@level2name=N'Subtotal';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Descuento ofrecido por el proveedor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Purchase', @level2type=N'COLUMN',@level2name=N'Discount';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Impuesto total a pagar por la compra' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Purchase', @level2type=N'COLUMN',@level2name=N'Tax';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador del proveedor' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Purchase', @level2type=N'COLUMN',@level2name=N'SupplierId';

CREATE TABLE dbo.PurchaseDetail ( 
	PurchaseId           varchar(5) NOT NULL    ,
	ProductId            varchar(5) NOT NULL    ,
	UnitCost             decimal(18,4) NOT NULL    ,
	Quantity             int NOT NULL    ,
	SuggestedRetailPrice decimal(18,4)     ,
	CONSTRAINT pk_PurchaseDetail PRIMARY KEY  ( PurchaseId, ProductId )
 );

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Tabla de detalles de la compra' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PurchaseDetail';;

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador de compra del sistema' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PurchaseDetail', @level2type=N'COLUMN',@level2name=N'PurchaseId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Identificador del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PurchaseDetail', @level2type=N'COLUMN',@level2name=N'ProductId';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Costo unitario del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PurchaseDetail', @level2type=N'COLUMN',@level2name=N'UnitCost';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Cantidad comprada del producto' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PurchaseDetail', @level2type=N'COLUMN',@level2name=N'Quantity';

exec sp_addextendedproperty  @name=N'MS_Description', @value=N'Precio sugerido de venta' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PurchaseDetail', @level2type=N'COLUMN',@level2name=N'SuggestedRetailPrice';

ALTER TABLE dbo.Inventory ADD CONSTRAINT fk_Inventory_Branch FOREIGN KEY ( BranchId ) REFERENCES dbo.Branch( BranchId ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.Inventory ADD CONSTRAINT fk_Inventory_Product FOREIGN KEY ( ProductId ) REFERENCES dbo.Product( ProductId ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.Invoice ADD CONSTRAINT FK__Invoice__BranchI__2A4B4B5E FOREIGN KEY ( BranchId ) REFERENCES dbo.Branch( BranchId ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.InvoiceDetail ADD CONSTRAINT fk_InvoiceDetail_Invoice FOREIGN KEY ( InvoiceId ) REFERENCES dbo.Invoice( InvoiceId ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.InvoiceDetail ADD CONSTRAINT fk_InvoiceDetail_Product FOREIGN KEY ( ProductId ) REFERENCES dbo.Product( ProductId ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.ProductCategory ADD CONSTRAINT fk_ProductCategory_Category FOREIGN KEY ( CategoryId ) REFERENCES dbo.Category( CategoryId ) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE dbo.ProductCategory ADD CONSTRAINT fk_ProductCategory_Product FOREIGN KEY ( ProductId ) REFERENCES dbo.Product( ProductId ) ON DELETE CASCADE ON UPDATE NO ACTION;

ALTER TABLE dbo.Purchase ADD CONSTRAINT fk_Purchase_Supplier FOREIGN KEY ( SupplierId ) REFERENCES dbo.Supplier( SupplierId ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.Purchase ADD CONSTRAINT FK__Purchase__Branch__3C69FB99 FOREIGN KEY ( BranchId ) REFERENCES dbo.Branch( BranchId ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.PurchaseDetail ADD CONSTRAINT fk_PurchaseDetail_Product FOREIGN KEY ( ProductId ) REFERENCES dbo.Product( ProductId ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.PurchaseDetail ADD CONSTRAINT fk_PurchaseDetail_Purchase FOREIGN KEY ( PurchaseId ) REFERENCES dbo.Purchase( PurchaseId ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.[User] ADD CONSTRAINT FK__User__DefaultBra__33D4B598 FOREIGN KEY ( DefaultBranch ) REFERENCES dbo.Branch( BranchId ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.UserRole ADD CONSTRAINT Fk_UserRole_User FOREIGN KEY ( [User] ) REFERENCES dbo.[User]( Username ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE dbo.UserRole ADD CONSTRAINT Fk_UserRole_Role FOREIGN KEY ( [Role] ) REFERENCES dbo.Role( IdRole ) ON DELETE NO ACTION ON UPDATE NO ACTION;
