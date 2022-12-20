import {
    Button,
    Container,
    Group,
    Notification,
    NumberInput,
    Stack,
    Table,
    Transition,
} from "@mantine/core";
import { IconX } from "@tabler/icons";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
    const [error, setError] = useState<string | null>(null);
    const [arraySize, setArraySize] = useState<number>(6);
    const [minValue, setMinValue] = useState<number>(1);
    const [maxValue, setMaxValue] = useState<number>(35);
    const [sumValue, setSumValue] = useState<number>(85);
    const [numberSets, setNumberSets] = useState<number[][]>([]);

    function generateNumbers(): number[] {
        try {
            const numbers = new Set<number>();

            while (numbers.size < arraySize) {
                const min = Math.ceil(minValue);
                const max = Math.floor(maxValue);
                numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
                // numbers.add(Math.floor(Math.random() * maxValue) + 1);
            }

            const sum = Array.from(numbers).reduce((acc, cur) => acc + cur, 0);

            if (sum === sumValue) {
                return Array.from(numbers);
            }

            return generateNumbers();
        } catch (error) {
            console.log(error);
            setError("Unable to generate numbers, try different values.");
            setNumberSets([]);
            return [];
        }
    }

    // function generateNumbers(): number[] {
    //     const numbers = new Set<number>();

    //     while (true) {
    //         while (numbers.size < arraySize) {
    //             const min = Math.ceil(minValue);
    //             const max = Math.floor(maxValue);
    //             numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    //         }

    //         const sum = Array.from(numbers).reduce((acc, cur) => acc + cur, 0);

    //         if (sum === sumValue) {
    //             return Array.from(numbers);
    //         }

    //         numbers.clear();
    //     }
    // }

    const handleClick = () => {
        setError(null);
        setNumberSets([]);
        Array.from(Array(10)).map(() => {
            setNumberSets((prev) => [...prev, generateNumbers()]);
        });
    };

    return (
        <>
            <Head>
                <title>Number Set Generator</title>
            </Head>
            <Container size="md" pos="relative">
                {
                    <Transition
                        mounted={error ? true : false}
                        transition="fade"
                        duration={250}
                        timingFunction="ease"
                    >
                        {(styles) => (
                            <Notification
                                icon={<IconX size={18} />}
                                color="red"
                                title="Processing error"
                                pos="fixed"
                                top={20}
                                right={20}
                                style={styles}
                            >
                                {error}
                            </Notification>
                        )}
                    </Transition>
                }
                <Stack justify="center" mih="100vh">
                    <Group align="end" position="center">
                        <NumberInput
                            size="xl"
                            label="Size"
                            hideControls
                            value={arraySize}
                            onChange={(val: number) => {
                                setArraySize(val);
                                setNumberSets([]);
                            }}
                            step={1}
                            max={7}
                            styles={{
                                input: { width: 80, textAlign: "center" },
                            }}
                        />
                        <NumberInput
                            size="xl"
                            label="Min"
                            hideControls
                            value={minValue}
                            onChange={(val: number) => setMinValue(val)}
                            step={1}
                            styles={{
                                input: { width: 80, textAlign: "center" },
                            }}
                        />
                        <NumberInput
                            size="xl"
                            label="Max"
                            hideControls
                            value={maxValue}
                            onChange={(val: number) => setMaxValue(val)}
                            step={1}
                            styles={{
                                input: { width: 80, textAlign: "center" },
                            }}
                        />
                        <NumberInput
                            size="xl"
                            label="Sum"
                            hideControls
                            value={sumValue}
                            onChange={(val: number) => setSumValue(val)}
                            step={1}
                            styles={{
                                input: { width: 80, textAlign: "center" },
                            }}
                        />
                        <Button size="xl" onClick={handleClick}>
                            Generate
                        </Button>
                    </Group>
                    {numberSets.length > 0 && (
                        <Table
                            striped
                            withBorder
                            withColumnBorders
                            highlightOnHover
                            fontSize="xl"
                            horizontalSpacing="sm"
                            verticalSpacing="sm"
                        >
                            <thead>
                                <tr>
                                    <th colSpan={arraySize + 1}></th>
                                    <th>Sum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {numberSets.map((set, i) => (
                                    <tr key={i}>
                                        <td>
                                            <strong>Set {i + 1}</strong>
                                        </td>
                                        {set.map((num, j) => (
                                            <td key={j}>{num}</td>
                                        ))}
                                        <td>
                                            {set.reduce(
                                                (accumulator, value) => {
                                                    return accumulator + value;
                                                },
                                                0
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Stack>
            </Container>
        </>
    );
}
