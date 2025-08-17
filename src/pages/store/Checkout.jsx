import { useForm } from "react-hook-form";
import OrderForm from "../../features/orders/OrderForm";
import Button from "../../ui/Button";
import PaymentForm from "../../features/orders/PaymentForm";
import Form from "../../ui/Form";
import { useCart } from "../../features/shoppingCart/useCart";
import { UseClearCart } from "../../features/shoppingCart/useClearCart";
import { useCreateCustomer } from "../../features/customers/useCreateCustomer";
import { useOrderProduct } from "../../features/orders/useOrderProduct";
import { getCurrentTimestamp } from "../../utils/helpers";

import { getTotalPrice } from "../../utils/helpers";
import { useCustomers } from "../../features/customers/useCustomers";
import toast from "react-hot-toast";
import { useEditCustomer } from "../../features/customers/useEditCustomer";
import Model from "../../ui/Model";
import ConfirmPlaceOrder from "../../ui/confirmPlaceOrder";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { register, watch, formState, handleSubmit, reset } = useForm();
  const paymentMethod = watch("paymentMethod");

  const { shoppingCartProducts } = useCart();

  const { clearCart } = UseClearCart(shoppingCartProducts);

  const { createCustomer } = useCreateCustomer();

  const { orderProduct } = useOrderProduct();

  const { customers } = useCustomers();

  const { editCustomer } = useEditCustomer();

  const navigate = useNavigate();

  useEffect(() => {
    if (shoppingCartProducts.length === 0) {
      navigate("..");
    }
  }, [shoppingCartProducts, navigate]);

  const onSubmit = async (data) => {
    const isPaid = paymentMethod === "online";

    const existingCustomer = customers.find(
      (cust) => cust.email === data.email || cust.phone === data.phone
    );

    const fullAddress = {
      street: data.street,
      city: data.city,
      country: data.country,
    };

    const totalPrice = getTotalPrice(shoppingCartProducts);

    const customerId = existingCustomer
      ? existingCustomer.id
      : `cust${Date.now()}`;

    const customerData = {
      id: customerId,
      fullName: data.name,
      email: data.email,
      phone: data.phone,
      address: fullAddress,
      status: "active",
      totalOrders: existingCustomer ? existingCustomer.totalOrders + 1 : 1,
      totalSpent: existingCustomer
        ? existingCustomer.totalSpent + totalPrice
        : totalPrice,
      createdAt: existingCustomer
        ? existingCustomer.createdAt
        : getCurrentTimestamp(),
      lastOrderDate: getCurrentTimestamp(),
    };

    try {
      if (existingCustomer) {
        await new Promise((resolve, reject) => {
          editCustomer(customerData, {
            onSuccess: resolve,
            onError: reject,
          });
        });
      } else {
        await new Promise((resolve, reject) => {
          createCustomer(customerData, {
            onSuccess: resolve,
            onError: reject,
          });
        });
      }

      const newOrder = {
        id: `ord${Date.now()}`,
        customerId,
        items: shoppingCartProducts,
        totalPrice,
        shippingAddress: { ...fullAddress, phone: data.phone },
        paymentMethod,
        paymentStatus: "Pending",
        isPaid,
        status: isPaid ? "Processing" : "Pending",

        paidAt: isPaid ? getCurrentTimestamp() : null,
        isDelivered: false,
        createdAt: getCurrentTimestamp(),
        notees: data.notes,
      };

      orderProduct(newOrder);
      clearCart();
      reset();
    } catch (error) {
      toast.error("Failed to place order:", error.message || error);
    }
  };
  function handleConfirmPlaceOrder() {
    handleSubmit(onSubmit)();
  }
  return (
    <>
      <Form>
        <OrderForm register={register} formState={formState} />

        <div>
          <label>Payment Method</label>

          <select {...register("paymentMethod", { required: true })}>
            <option value="">-- Choose Payment Method --</option>
            <option value="cod">Cash on Delivery</option>
            <option value="online">Pay Online</option>
          </select>
        </div>
        {paymentMethod === "online" && (
          <PaymentForm register={register} formState={formState} />
        )}
      </Form>
      <Model>
        <Model.Open opens="confirm-order">
          <Button disabled={shoppingCartProducts.length === 0}>
            Place Order
          </Button>
        </Model.Open>
        <Model.Window name="confirm-order">
          <ConfirmPlaceOrder
            itemCount={shoppingCartProducts?.length}
            totalAmount={getTotalPrice(shoppingCartProducts)}
            paymentMethod={paymentMethod}
            onConfirm={handleConfirmPlaceOrder}
          />
        </Model.Window>
      </Model>
    </>
  );
}

export default Checkout;
