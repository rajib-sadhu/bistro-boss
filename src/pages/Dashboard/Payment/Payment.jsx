import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useCart from '../../../hooks/useCart';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {

    const [cart] = useCart();
    const total = cart.reduce( (sum, item)=>{
        return sum + item.price;
    } ,0);

    const price = parseFloat(total.toFixed(2));

    return (
        <div className="px-10">
            <SectionTitle heading="Payment" subHeading="Please process" />
            <Elements stripe={stripePromise} >
                <CheckoutForm price={price} cart={cart} />
            </Elements>
        </div>
    );
};

export default Payment;