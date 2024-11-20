import { Transaction } from "@mysten/sui/transactions";
import { Button, Container } from "@radix-ui/themes";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "networkConfig";

export function CreateCounter({
    onCreated,
}: {
    onCreated: (id: string) => void;
}) {
    const suiClient = useSuiClient();
    const counterPackageId = useNetworkVariable("COUNTER_PACKAGE_ID");
    const [ mutate: signAndExecute ] = useSignAndExecuteTransaction({
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
            </Button>
        </Container>
    );
}
