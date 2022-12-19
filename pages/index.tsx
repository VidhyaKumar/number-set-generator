import {
    Button,
    Center,
    Container,
    Group,
    NumberInput,
    Stack,
    Table,
} from "@mantine/core";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
    const [arraySize, setArraySize] = useState(6);
    const [maxValue, setMaxValue] = useState(35);
    const [sumValue, setSumValue] = useState(85);
    const [numberSets, setNumberSets] = useState<number[][]>([]);

    function generateNumbers(): number[] {
        const numbers = new Set<number>();
        while (numbers.size < arraySize) {
            numbers.add(Math.floor(Math.random() * maxValue) + 1);
        }
        const sum = Array.from(numbers).reduce((acc, cur) => acc + cur, 0);
        if (sum === sumValue) {
            return Array.from(numbers);
        } else {
            return generateNumbers();
        }
    }

    const handleClick = () => {
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
            <Container size="sm">
                <Stack justify="center" mih="100vh">
                    <Group align="end" position="center">
                        <NumberInput
                            size="xl"
                            label="Size"
                            hideControls
                            value={arraySize}
                            onChange={(val: number) => setArraySize(val)}
                            step={1}
                            max={7}
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
