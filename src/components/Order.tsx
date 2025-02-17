"use client";
import { db } from "@/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import FormattedPrice from "./FormattedPrice";
import { ProductData } from "@/types";
import { urlFor } from "@/sanity/lib/image";
import { motion, AnimatePresence } from "framer-motion";
import Table, {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import Image from "next/image";

interface Order {
  id: string;
  value: {
    amount: number;
    items: ProductData[];
  };
}

const Orders = () => {
  const { data: session } = useSession();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleDetails = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const userEmail = session?.user?.email;
  const [ordersSnapshot, loading] = useCollection(
    userEmail ? collection(db, "users", userEmail, "orders") : null
  );

  const orders = ordersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[] | undefined;

  const handleDeleteOrder = async (id: string) => {
    if (!userEmail) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      await deleteDoc(doc(db, "users", userEmail, "orders", id));
      toast.success("Order deleted successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-5 mt-5">
      {loading ? (
        <div className="flex flex-col flex-1 space-y-6 overflow-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-full py-20 rounded-md shrink-0 animate-pulse bg-zinc-400"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders?.length ? (
            orders.map((item: Order) => (
              <div key={item.id}>
                <Card
                  className={
                    expandedOrderId === item.id ? "border-darkOrange/30" : ""
                  }
                >
                  <CardHeader>
                    <CardTitle>
                      Order ID:{" "}
                      <span className="text-base tracking-wide">
                        {item.id.slice(-10)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium text-black/60">
                          Total Amount
                        </p>
                        <FormattedPrice
                          amount={item.value.amount}
                          className="text-lg font-semibold"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black/60">
                          Payment Status
                        </p>
                        <Badge variant="success">Paid</Badge>
                      </div>
                      <Button onClick={() => toggleDetails(item.id)}>
                        {expandedOrderId === item.id
                          ? "Hide Details"
                          : "Show Details"}
                      </Button>
                      <Button
                        onClick={() => handleDeleteOrder(item.id)}
                        variant="delete"
                      >
                        <MdClose className="text-base mt-1" /> Delete order
                      </Button>
                    </div>
                  </CardContent>
                  <AnimatePresence>
                    {expandedOrderId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="border-0 border-t rounded-none">
                          <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Image</TableHead>
                                  <TableHead>Item</TableHead>
                                  <TableHead className="text-center">
                                    Price
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Quantity
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Subtotal
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {item.value.items.map(
                                  (product: ProductData) => (
                                    <TableRow key={product._id}>
                                      <TableCell className="w-20">
                                        <Image
                                          src={urlFor(product?.image)?.url()}
                                          alt={product.title}
                                          className="object-cover rounded-md line-clamp-1"
                                          height={64}
                                          width={64}
                                        />
                                      </TableCell>
                                      <TableCell>{product.title}</TableCell>
                                      <TableCell className="text-center">
                                        <FormattedPrice
                                          amount={product.price}
                                        />
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {product.quantity}
                                      </TableCell>
                                      <TableCell className="text-right font-semibold">
                                        <FormattedPrice
                                          amount={
                                            product.price * product.quantity
                                          }
                                        />
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            ))
          ) : (
            <div>
              <p className="text-lg font-medium -mt-3">
                Your order data is empty.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
