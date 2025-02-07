--Usamos la Base de Datos
USE Inwent
GO

------------------------------------
------------------------------------
----------Store Procedures----------
------------------------------------
------------------------------------

--Branch table stored procedures
CREATE PROCEDURE SP_AddBranch
	@BranchId varchar(5)  ,
	@Name varchar(100) ,
	@Address varchar(200),
	@Active bit ,
	@Phone varchar(15)
AS
BEGIN
	INSERT INTO dbo.Branch (BranchId, [Name], [Address], Active, Phone)
	VALUES (@BranchId, @Name, @Address, @Active, @Phone)
END
GO

CREATE PROCEDURE SP_ModifyBranch
	@BranchId varchar(5) ,
	@Name varchar(100) ,
	@Address varchar(200),
	@Active bit ,
	@Phone varchar(15)
AS
BEGIN
	UPDATE dbo.Branch
	Set	
		[Name] = @Name,
		[Address] = @Address,
		Active = @Active,
		Phone = @Phone
	WHERE BranchId = @BranchId 
END
GO

CREATE PROCEDURE SP_DeleteBranch
	@BranchId varchar(5)
AS
BEGIN
	DELETE FROM dbo.Branch WHERE BranchId = @BranchId
END
GO

--Category table stored procedures
CREATE PROCEDURE SP_AddCategory
	@CategoryId int ,
	@Name varchar(100) ,
	@Description varchar(100) 
AS
BEGIN
	INSERT INTO dbo.Category (CategoryId, [Name], [Description])
	VALUES (@CategoryId, @Name, @Description)
END
GO

CREATE PROCEDURE SP_ModifyCategory
	@CategoryId int ,
	@Name varchar(100) ,
	@Description varchar(100) 
AS
BEGIN
	UPDATE dbo.Category
	Set	
		[Name] = @Name,
		[Description] = @Description
	WHERE CategoryId = @CategoryId 
END
GO

CREATE PROCEDURE SP_DeleteCategory
	@CategoryId int
AS
BEGIN
	DELETE FROM dbo.Category WHERE CategoryId = @CategoryId
END
GO

--Consecutive table stored procedures
CREATE PROCEDURE SP_AddConsecutive
	@ConsecutiveId varchar(5) ,
	@Mask varchar(20) ,
	@Length int ,
	@Consecutive varchar(20) 
AS
BEGIN
	INSERT INTO dbo.Consecutive (ConsecutiveId, Mask, [Length], Consecutive)
	VALUES (@ConsecutiveId, @Mask, @Length, @Consecutive)
END
GO

CREATE PROCEDURE SP_ModifyConsecutive
	@ConsecutiveId varchar(5) ,
	@Mask varchar(20) ,
	@Length int ,
	@Consecutive varchar(20) 
AS
BEGIN
	UPDATE dbo.Consecutive
	Set	
		Mask = @Mask,
		[Length] = @Length,
		Consecutive = @Consecutive
	WHERE ConsecutiveId = @ConsecutiveId 
END
GO

CREATE PROCEDURE SP_DeleteConsecutive
	@ConsecutiveId varchar(5)
AS
BEGIN
	DELETE FROM dbo.Consecutive WHERE ConsecutiveId = @ConsecutiveId
END
GO

--Invoice table stored procedures
CREATE PROCEDURE SP_AddInvoice
	@InvoiceId varchar(5) ,
	@Date datetime ,
	@Subtotal decimal(18,4) ,
	@Discount decimal(18,4) ,
	@Tax decimal(18,4)  
AS
BEGIN 
	INSERT INTO dbo.Invoice (InvoiceId, [Date], Subtotal, Discount, Tax)
	VALUES (@InvoiceId, @Date, @Subtotal, @Discount, @Tax)
END
GO

CREATE PROCEDURE SP_ModifyInvoice
	@InvoiceId varchar(5) ,
	@Date datetime ,
	@Subtotal decimal(18,4) ,
	@Discount decimal(18,4) ,
	@Tax decimal(18,4) 
AS
BEGIN
	UPDATE dbo.Invoice
	Set	
		[Date] = @Date,
		Subtotal = @Subtotal,
		Discount = @Discount,
		Tax = @Tax
	WHERE InvoiceId = @InvoiceId
END
GO

CREATE PROCEDURE SP_DeleteInvoice
	@InvoiceId varchar(5)
AS
BEGIN
	DELETE FROM dbo.Invoice WHERE InvoiceId = @InvoiceId
END
GO

--Product table stored procedures
CREATE PROCEDURE SP_AddProduct
	@ProductId varchar(5) ,
	@Description varchar(200) ,
	@Type char(1) ,
	@Barcode varchar(100),
	@Price decimal(18,4) ,
	@MinStock int,
	@PhotoUri varchar(100)  
AS
BEGIN 
	INSERT INTO dbo.Product (ProductId, [Description], [Type], Barcode, Price, MinStock, PhotoUri)
	VALUES (@ProductId, @Description, @Type, @Barcode, @Price, @MinStock, @PhotoUri)
END
GO

CREATE PROCEDURE SP_ModifyProduct
	@ProductId varchar(5) ,
	@Description varchar(200) ,
	@Type char(1) ,
	@Barcode varchar(100),
	@Price decimal(18,4) ,
	@MinStock int,
	@PhotoUri varchar(100)  
AS
BEGIN
	UPDATE dbo.Product
	Set	
		[Description] = @Description,
		[Type] = @Type,
		Barcode = @Barcode,
		Price = @Price,
		MinStock = @MinStock,
		PhotoUri = @PhotoUri
	WHERE ProductId = @ProductId
END
GO

CREATE PROCEDURE SP_DeleteProduct
	@ProductId varchar(5)
AS
BEGIN
	DELETE FROM dbo.Product WHERE ProductId = @ProductId
END
GO 

--ProductCategory table stored procedures
CREATE PROCEDURE SP_AddProductCategory
	@ProductId varchar(5) ,
	@CategoryId int  
AS
BEGIN 
	INSERT INTO dbo.ProductCategory (ProductId, CategoryId)
	VALUES (@ProductId, @CategoryId)
END
GO

CREATE PROCEDURE SP_ModifyProductCategory
	@ProductId varchar(5) ,
	@CategoryId int   
AS
BEGIN
	UPDATE dbo.ProductCategory
	Set	
		ProductId = @ProductId,
		CategoryId = @CategoryId
	WHERE ProductId = @ProductId and CategoryId = @CategoryId
END
GO

CREATE PROCEDURE SP_DeleteProductCategory
	@ProductId varchar(5),
	@CategoryId int  
AS
BEGIN
	DELETE FROM dbo.ProductCategory WHERE ProductId = @ProductId and CategoryId = @CategoryId
END
GO 

--Supplier table stored procedures
CREATE PROCEDURE SP_AddSupplier
	@SupplierId varchar(5) ,
	@Name varchar(100) ,
	@Phone varchar(15),
	@Address varchar(200) ,
	@Email varchar(100) 
AS
BEGIN 
	INSERT INTO dbo.Supplier (SupplierId, [Name], Phone, [Address], Email)
	VALUES (@SupplierId, @Name, @Phone, @Address, @Email)
END
GO

CREATE PROCEDURE SP_ModifySupplier
	@SupplierId varchar(5) ,
	@Name varchar(100) ,
	@Phone varchar(15),
	@Address varchar(200) ,
	@Email varchar(100)   
AS
BEGIN
	UPDATE dbo.Supplier
	Set	
		[Name] = @Name,
		Phone = @Phone,
		[Address] = @Address,
		Email = @Email
	WHERE SupplierId = @SupplierId
END
GO

CREATE PROCEDURE SP_DeleteSupplier
	@SupplierId varchar(5)
AS
BEGIN
	DELETE FROM dbo.Supplier WHERE SupplierId = @SupplierId
END
GO 

--User table stored procedures
CREATE PROCEDURE SP_Add_User
	@Username varchar(20) ,
	@Password varchar(100) ,
	@Firstname varchar(100) ,
	@Lastname varchar(100) ,
	@LastLogin date,
	@Active bit 
AS
BEGIN 
	INSERT INTO dbo.[User] (Username, [Password], Firstname, Lastname, LastLogin, Active)
	VALUES (@Username, @Password, @Firstname, @Lastname, @LastLogin, @Active)
END
GO

CREATE PROCEDURE SP_ModifyUser
	@Username varchar(20) ,
	@Password varchar(100) ,
	@Firstname varchar(100) ,
	@Lastname varchar(100) ,
	@LastLogin date,
	@Active bit   
AS
BEGIN
	UPDATE dbo.[User]
	Set	
		Username = @Username,
		[Password] = @Password,
		Firstname = @Firstname,
		Lastname = @Lastname,
		LastLogin = @LastLogin,
		Active = @Active
	WHERE Username = @Username
END
GO

CREATE PROCEDURE SP_DeleteUser
	@Username varchar(20)
AS
BEGIN
	DELETE FROM dbo.[User] WHERE Username = @Username 
END
GO 

--Inventory table stored procedures
CREATE PROCEDURE SP_AddInventory
	@InventoryId int ,
	@BranchId varchar(5) ,
	@ProductId varchar(5) ,
	@Stock int   
AS
BEGIN 
	INSERT INTO dbo.Inventory (InventoryId, BranchId, ProductId, Stock)
	VALUES (@InventoryId, @BranchId, @ProductId, @Stock)
END
GO

CREATE PROCEDURE SP_ModifyInventory
	@InventoryId int ,
	@BranchId varchar(5) ,
	@ProductId varchar(5) ,
	@Stock int   
AS
BEGIN
	UPDATE dbo.Inventory
	Set	
		BranchId = @BranchId,
		ProductId = @ProductId,
		Stock = @Stock
	WHERE InventoryId = @InventoryId
END
GO

CREATE PROCEDURE SP_DeleteInventory
	@InventoryId int
AS
BEGIN
	DELETE FROM dbo.Inventory WHERE InventoryId = @InventoryId 
END
GO

--InvoiceDetail table stored procedures
CREATE PROCEDURE SP_AddInvoiceDetail
	@InvoiceId varchar(5) ,
	@ProductId varchar(5) ,
	@Quantity int ,
	@UnitPrice decimal(18,4) 
AS
BEGIN 
	INSERT INTO dbo.InvoiceDetail (InvoiceId, ProductId, Quantity, UnitPrice)
	VALUES (@InvoiceId, @ProductId, @Quantity, @UnitPrice)
END
GO

CREATE PROCEDURE SP_ModifyInvoiceDetail
	@InvoiceId varchar(5) ,
	@ProductId varchar(5) ,
	@Quantity int ,
	@UnitPrice decimal(18,4) 
AS
BEGIN
	UPDATE dbo.InvoiceDetail
	Set	
		InvoiceId = @InvoiceId,
		ProductId = @ProductId,
		Quantity = @Quantity,
		UnitPrice = @UnitPrice
	WHERE InvoiceId = @InvoiceId and ProductId = @ProductId
END
GO

CREATE PROCEDURE SP_DeleteInvoiceDetail
	@InvoiceId varchar(5),
	@ProductId varchar(5)
AS
BEGIN
	DELETE FROM dbo.InvoiceDetail WHERE InvoiceId = @InvoiceId and ProductId = @ProductId 
END
GO

--Purchase table stored procedures
CREATE PROCEDURE SP_AddPurchase
	@PurchaseId varchar(5) ,
	@SupplierInvoiceId varchar(10) ,
	@Date datetime ,
	@Subtotal decimal(18,4) ,
	@Discount decimal(18,4) ,
	@Tax decimal(18,4) ,
	@SupplierId varchar(5)     
AS
BEGIN 
	INSERT INTO dbo.Purchase (PurchaseId, SupplierInvoiceId, [Date], Subtotal, Discount, Tax, SupplierId)
	VALUES (@PurchaseId, @SupplierInvoiceId, @Date, @Subtotal, @Discount, @Tax, @SupplierId)	
END
GO

CREATE PROCEDURE SP_ModifyPurchase
	@PurchaseId varchar(5) ,
	@SupplierInvoiceId varchar(10) ,
	@Date datetime ,
	@Subtotal decimal(18,4) ,
	@Discount decimal(18,4) ,
	@Tax decimal(18,4) ,
	@SupplierId varchar(5)  
AS
BEGIN
	UPDATE dbo.Purchase
	Set	
		SupplierInvoiceId = @SupplierInvoiceId,
		[Date] = @Date,
		Subtotal = @Subtotal,
		Discount = @Discount,
		Tax = @Tax,
		SupplierId = @SupplierId
	WHERE PurchaseId = @PurchaseId
END
GO

CREATE PROCEDURE SP_DeletePurchase
	@PurchaseId varchar(5)
AS
BEGIN
	DELETE FROM dbo.Purchase WHERE PurchaseId = @PurchaseId 
END
GO

--PurchaseDetail table stored procedures
CREATE PROCEDURE SP_AddPurchaseDetail
	@PurchaseId varchar(5) ,
	@ProductId varchar(5) ,
	@UnitCost decimal(18,4) ,
	@Quantity decimal(18,4) ,
	@SuggestedRetailPrice decimal(18,4) 
AS
BEGIN 
	INSERT INTO dbo.PurchaseDetail (PurchaseId, ProductId, UnitCost, Quantity, SuggestedRetailPrice)
	VALUES (@PurchaseId, @ProductId, @UnitCost, @Quantity, @SuggestedRetailPrice)	
END
GO

CREATE PROCEDURE SP_ModifyPurchaseDetail
	@PurchaseId varchar(5) ,
	@ProductId varchar(5) ,
	@UnitCost decimal(18,4) ,
	@Quantity decimal(18,4) ,
	@SuggestedRetailPrice decimal(18,4) 
AS
BEGIN
	UPDATE dbo.PurchaseDetail
	Set	
		PurchaseId = @PurchaseId,
		ProductId = @ProductId,
		UnitCost = @UnitCost,
		Quantity = @Quantity,
		SuggestedRetailPrice = @SuggestedRetailPrice
	WHERE PurchaseId = @PurchaseId and ProductId = @ProductId
END
GO

CREATE PROCEDURE SP_DeletePurchaseDetail
	@PurchaseId varchar(5),
	@ProductId varchar(5)
AS
BEGIN
	DELETE FROM dbo.PurchaseDetail WHERE PurchaseId = @PurchaseId and ProductId = @ProductId 
END
GO

------------------------------------
------------------------------------
---------------Views----------------
------------------------------------
------------------------------------

--Branch table views
CREATE VIEW V_AllBraches
AS
	SELECT * FROM dbo.Branch
GO

CREATE VIEW V_AllBranchesSortedByName
AS
	SELECT TOP 100 PERCENT * FROM dbo.Branch
	ORDER BY [Name] ASC
GO

CREATE VIEW V_AllActiveBranches
AS
	SELECT TOP 100 PERCENT * FROM dbo.Branch
	WHERE Active = 1
	ORDER BY [Name] ASC
GO

--Category table views
CREATE VIEW V_AllCategories
AS
	SELECT * FROM dbo.Category
GO

CREATE VIEW V_AllCategoriesSortedByName
AS
	SELECT TOP 100 PERCENT * FROM dbo.Category
	ORDER BY [Name] ASC
GO

CREATE VIEW V_AllCategoriesSortedByDescription
AS
	SELECT TOP 100 PERCENT * FROM dbo.Category
	ORDER BY [Description] ASC
GO

--Consecutive table views
CREATE VIEW V_AllConsecutives
AS
	SELECT * FROM dbo.Consecutive
GO

CREATE VIEW V_AllConsecutivesSorted
AS
	SELECT TOP 100 PERCENT * FROM dbo.Consecutive
	ORDER BY Consecutive ASC
GO

--Invoice table views
CREATE VIEW V_AllInvoices
AS
	SELECT * FROM dbo.Invoice
GO

CREATE VIEW V_AllInvoicesSortedByDateASC
AS
	SELECT TOP 100 PERCENT * FROM dbo.Invoice
	ORDER BY [Date] ASC
GO

CREATE VIEW V_AllInvoicesSortedByDateDESC
AS
	SELECT TOP 100 PERCENT * FROM dbo.Invoice
	ORDER BY [Date] DESC
GO

--Product table views
CREATE VIEW V_AllProducts
AS
	SELECT * FROM dbo.Product
GO

CREATE VIEW V_AllProductsSortedByDescription
AS
	SELECT TOP 100 PERCENT * FROM dbo.Product
	ORDER BY [Description] DESC
GO

CREATE VIEW V_AllProductsSortedByType
AS
	SELECT TOP 100 PERCENT * FROM dbo.Product
	ORDER BY [Type] DESC
GO

CREATE VIEW V_AllProductsSortedByMinStock
AS
	SELECT TOP 100 PERCENT * FROM dbo.Product
	ORDER BY MinStock ASC
GO

--ProductCategory table views
CREATE VIEW V_AllProductCategories
AS
	SELECT TOP 100 PERCENT
		C.[Name] AS Category, C.[Description] AS CategoryDescription, P.[Description] AS ProductDescription, P.[Type], P.Barcode, P.Price, P.MinStock
	FROM dbo.ProductCategory AS PC
		JOIN dbo.Product AS P on PC.ProductId = P.ProductId 
		JOIN dbo.Category AS C on PC.CategoryId = C.CategoryId
	ORDER BY C.[Name] ASC
GO

--Supplier table views
CREATE VIEW V_AllSuppliers
AS
	SELECT * FROM dbo.Supplier
GO

CREATE VIEW V_AllSuppliersSortedByNameASC
AS
	SELECT TOP 100 PERCENT * FROM dbo.Supplier
	ORDER BY [Name] ASC
GO

CREATE VIEW V_AllSuppliersSortedByNameDESC
AS
	SELECT TOP 100 PERCENT * FROM dbo.Supplier
	ORDER BY [Name] DESC
GO

--User table views
CREATE VIEW V_AllUsers
AS
	SELECT * FROM dbo.[User]
GO

CREATE VIEW V_AllUsersSortedByFirstname
AS
	SELECT TOP 100 PERCENT * FROM dbo.[User]
	ORDER BY Firstname ASC
GO

CREATE VIEW V_AllUsersSortedByLastname
AS
	SELECT TOP 100 PERCENT * FROM dbo.[User]
	ORDER BY Lastname ASC
GO

CREATE VIEW V_AllActiveUsers
AS
	SELECT * FROM dbo.[User] WHERE Active = 1
GO

--Inventory table views
CREATE VIEW V_AllInventory
AS
	SELECT TOP 100 PERCENT
	P.[Description] AS ProductDescription, P.[Type], P.Price, P.MinStock, I.Stock,
	B.[Name] AS BrachName, B.[Address], B.Phone
	FROM dbo.Inventory AS I
		JOIN dbo.Branch AS B on I.BranchId = B.BranchId
		JOIN dbo.Product AS P on P.ProductId = I.ProductId
	ORDER BY P.[Description] ASC
GO

CREATE VIEW V_AllInventorySortedByStock
AS
	SELECT TOP 100 PERCENT
		I.Stock, P.[Description] AS ProductDescription, P.[Type], P.Price, P.MinStock,
		B.[Name] AS BrachName, B.[Address], B.Phone
	FROM dbo.Inventory AS I
		JOIN dbo.Branch AS B on I.BranchId = B.BranchId
		JOIN dbo.Product AS P on P.ProductId = I.ProductId
	ORDER BY I.Stock ASC
GO

--InvoiceDetail table views
CREATE VIEW V_AllInvoiceDetails
AS
	SELECT TOP 100 PERCENT 
		I.InvoiceId AS Invoice, ID.Quantity, ID.UnitPrice, I.Tax,
		ID.Subtotal, I.Total, I.[Date], P.[Description] AS Product, P.[Type]
	FROM dbo.InvoiceDetail AS ID
		JOIN dbo.Invoice AS I on ID.InvoiceId = I.InvoiceId
		JOIN dbo.Product AS P on ID.ProductId = P.ProductId
	ORDER BY ID.InvoiceId
GO

--Purchase table views
CREATE VIEW V_AllPurchases
AS
	SELECT TOP 100 PERCENT 
		P.SupplierInvoiceId, P.[Date], P.Subtotal, P.Discount, P.Tax,
		S.[Name] AS Supplier, S.Phone, S.[Address], S.Email 
	FROM dbo.Purchase AS P
		JOIN dbo.Supplier AS S on P.SupplierId = S.SupplierId
	ORDER BY P.SupplierInvoiceId
GO

--PurchaseDetail table views
CREATE VIEW V_AllPurchaseDetails
AS
	SELECT TOP 100 PERCENT 
		S.[Name] AS Supplier, PUR.SupplierInvoiceId, PUR.[Date] AS PurchaseDate, 
		PUR.Tax AS PurchaseTax, PUR.Discount AS PurchaseDiscount, P.[Description] AS Product, P.[Type], 
		PD.UnitCost, PD.Quantity, PD.SuggestedRetailPrice
	FROM dbo.PurchaseDetail AS PD
		JOIN dbo.Purchase AS Pur on PD.PurchaseId = Pur.PurchaseId
		JOIN dbo.Product AS P on PD.ProductId = P.ProductId
		JOIN dbo.Supplier AS S on PUR.SupplierId = S.SupplierId
	ORDER BY P.[Description] ASC
GO