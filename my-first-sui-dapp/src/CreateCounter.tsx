// import { Transaction } from "@mysten/sui/transactions";
// import { Button, Container } from "@radix-ui/themes";
// import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
// import { useNetworkVariable } from "./networkConfig";
// import ClipLoader from "react-spinners/ClipLoader";
// import { useState } from "react";

// // This component will be used to create a new counter
// // It will take a callback function as an argument
// export function CreateCounter({
//     // This function will be called when the counter is created
//     onCreated,
// }: {
//     // Type definition for the onCreated callback
//     // This function will take a string as an argument
//     onCreated: (id: string) => void;
// }) {

//     // Get the counter package ID from the network configuration
//     const counterPackageId = useNetworkVariable("counterPackageId");
//     // Get the Sui client
//     const suiClient = useSuiClient();
//     const {
//         // Destructure the mutate function and rename it to signAndExecute
//         mutate: signAndExecute,
//         // Destructure the isSuccess state
//         // This state will be true when the transaction is successful
//         isSuccess,
//         // Destructure the isSuccess state
//         // This state will be true when the transaction is pending
//      	isPending,
//         // Use the useSignAndExecuteTransaction hook
//     } = useSignAndExecuteTransaction();

//     // Create a function to create a new counter
//     // This function will create a new counter by calling the create function of the counter package
//     function create() {
//         // Create a new transaction
//         const tx = new Transaction()

//         // Move the call to the create function of the counter package
//         // Add a move call to the transaction object with the following properties
//         tx.moveCall({
//             arguments: [],
//             // The target property will be the counter package ID
//             // Target the create function in the counter module 
//             target: `${counterPackageId}::counter::create`,
//         });

//         // Call the signAndExecute function with the transaction object
//         signAndExecute(
//             {
//                 // Pass an object with the transaction property
//                 transaction: tx
//             },
//             {
//                 // Pass an object with the onSuccess property
//                 // This function will take an object as an argument
//                 onSuccess: async ({digest}) => {
//                     // Get the effects of the transaction
//                     // Wait for the transaction to complete
//                     const { effects } = await suiClient.waitForTransaction({
//                         // Pass an object with the digest property
//                         // This property will be the digest of the transaction
//                         digest: digest,
//                         // Pass an object with the options property
//                         // This will show the effects of the transaction
//                         options: {
//                             showEffects: true,
//                         }
//                     });
//                     // Call the onCreated function with the object ID of the created counter
//                     // The reference will be the object ID of the created counter
//                     onCreated(effects?.created?.[0]?.reference?.objectId!);
//                 }
//             }
//         );
//     }

//     return (
//         <Container>
//             <Button
//                 size="3"
//                 // Add an onClick event listener to the button
//                 onClick={() => {
//                     // Call the create function when the button is clicked
//                     create();
//                 }}
//                 // Disable the button when the transaction is successful or pending
//                 disabled={isSuccess || isPending}
//             > 
//             {/* Show a loader if the transaction is in progress or successful, otherwise show "Create Counter" */}
//                 {isSuccess || isPending ? <ClipLoader size={20} /> : "Create Counter"}
//             </Button>
//         </Container>
//     );
// }

import { Transaction } from "@mysten/sui/transactions";
import { Button, Container } from "@radix-ui/themes";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";
export function CreateCounter({
  onCreated,
}: {
  onCreated: (id: string) => void;
}) {
  const counterPackageId = useNetworkVariable("counterPackageId");
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showEffects: true,
        },
      }),
  });
  return (
    <Container>
      <Button
        size="3"
        onClick={() => {
          create();
        }}
      >
        Create Counter
      </Button>
    </Container>
  );
  function create() {
    const tx = new Transaction();
    tx.moveCall({
      arguments: [],
      target: `${counterPackageId}::counter::create`,
    });
    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: (result) => {
          const objectId = result.effects?.created?.[0]?.reference?.objectId;
          if (objectId) {
            onCreated(objectId);
          }
        },
      },
    );
  }
}
