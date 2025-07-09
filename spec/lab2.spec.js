const User = require('../lab2.js');

describe("lab2.js", () => {
    describe("User class", () => {
        let user;

        beforeEach(() => {
            user = new User("TestUser", "password123");
        });

        it("should create a user with name, password, and empty cart", () => {
            expect(user.name).toBe("TestUser");
            expect(user.password).toBe("password123");
            expect(user.cart).toEqual([]);
        });

        describe("addToCart", () => {
            it("should add a product to the cart", () => {
                const product1 = { name: "Laptop", price: 1200 };
                user.addToCart(product1);
                expect(user.cart.length).toBe(1);
                expect(user.cart[0]).toEqual(product1);

                const product2 = { name: "Mouse", price: 25 };
                user.addToCart(product2);
                expect(user.cart.length).toBe(2);
                expect(user.cart[1]).toEqual(product2);
            });
        });

        describe("calculateTotalCartPrice", () => {
            it("should return 0 for an empty cart", () => {
                expect(user.calculateTotalCartPrice()).toBe(0);
            });

            it("should calculate the total price of products in the cart", () => {
                user.addToCart({ name: "Keyboard", price: 75 });
                user.addToCart({ name: "Monitor", price: 300 });
                expect(user.calculateTotalCartPrice()).toBe(375);
            });
        });

        describe("checkout", () => {
            let mockPaymentModel;

            beforeEach(() => {
                // Create a mock payment model for each test
                mockPaymentModel = {
                    goToVerifyPage: jasmine.createSpy("goToVerifyPage"),
                    returnBack: jasmine.createSpy("returnBack"),
                    isVerify: jasmine.createSpy("isVerify")
                };
            });

            it("should call all paymentModel methods", () => {
                user.checkout(mockPaymentModel);
                expect(mockPaymentModel.goToVerifyPage).toHaveBeenCalled();
                expect(mockPaymentModel.returnBack).toHaveBeenCalled();
                expect(mockPaymentModel.isVerify).toHaveBeenCalled();
            });

            it("should return true if paymentModel.isVerify returns true", () => {
                mockPaymentModel.isVerify.and.returnValue(true);
                expect(user.checkout(mockPaymentModel)).toBe(true);
            });

            it("should return false if paymentModel.isVerify returns false", () => {
                mockPaymentModel.isVerify.and.returnValue(false);
                expect(user.checkout(mockPaymentModel)).toBe(false);
            });
        });
    });
});
