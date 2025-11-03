# BekuMart - Frozen Food E-Commerce (Frontend)

[**View Live Demo**](https://bekumart-frontend.vercel.app) &nbsp;&nbsp;•&nbsp;&nbsp; [Backend API Repo](https://github.com/NahlBee97/bekumart-backend)

This is the complete frontend for BekuMart, a full-stack e-commerce platform for frozen food. It is a modern, responsive application built with Next.js, featuring a full user workflow from browsing to a successful, paid order.

---

### ## ✨ Core Features

* **Full E-commerce Workflow:** Complete user journey including product browsing, searching, filtering, and a persistent, database-linked shopping cart, checkout to payment.
* **Integrated Google Login:** User can login/register with google accounts.
* **Secure Authentication:** Secure JWT-based authentication with **HttpOnly refresh tokens** and silent refresh for a seamless user experience.
* **Complex Checkout Flow:** Users can choose between **Local Delivery** (with a dynamic, distance-based and weight fee) or **In-Store Pickup**.
* **Integrate Rajaongkir:** Integrated rajaongkir public API to get delivery fee and indonesia regional data.
* **Live Payment Gateway:** Integrated **Midtrans** payment popup (using Snap.js) to handle real-time online payments for delivery orders and online payments.
* **Customer Dashboard:** Users can view their information and order history and check the status of pending orders.
* **Protected Admin Panel:** A separate, role-protected dashboard for administrators to view sales insights, incoming orders, update their fulfillment status, manage product stock, edit or add products.

---

### ## 💻 Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** Zustand
* **Deployment:** Vercel

1.  **Clone the repository:**
    ```bash
    git clone <this repo url>
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root and add the required variables.
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000 # (or your deployed backend URL)
    NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_sandbox_client_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.