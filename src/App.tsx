import { Flex, List } from 'antd';
import { Canvg, RenderingContext2D } from 'canvg';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import SealDemo from './SealDemo';
import seal1 from './assets/seal-1.svg';

const data: { type: 'star' | 'dot'; name: string; bold: boolean }[] = [
	{ type: 'dot', name: '박', bold: false },
	{ type: 'star', name: '박', bold: false },
	{ type: 'dot', name: '박', bold: true },
	{ type: 'star', name: '박', bold: true },

	{ type: 'dot', name: '박박', bold: false },
	{ type: 'star', name: '박박', bold: false },
	{ type: 'dot', name: '박박', bold: true },
	{ type: 'star', name: '박박', bold: true },

	{ type: 'dot', name: '박박박', bold: false },
	{ type: 'star', name: '박박박', bold: false },
	{ type: 'dot', name: '박박박', bold: true },
	{ type: 'star', name: '박박박', bold: true },

	{ type: 'dot', name: '박박박박', bold: false },
	{ type: 'star', name: '박박박박', bold: false },
	{ type: 'dot', name: '박박박박', bold: true },
	{ type: 'star', name: '박박박박', bold: true },

	{ type: 'dot', name: '박박박박박', bold: false },
	{ type: 'star', name: '박박박박박', bold: false },
	{ type: 'dot', name: '박박박박박', bold: true },
	{ type: 'star', name: '박박박박박', bold: true },

	{ type: 'dot', name: '박박박박박박', bold: false },
	{ type: 'star', name: '박박박박박박', bold: false },
	{ type: 'dot', name: '박박박박박박', bold: true },
	{ type: 'star', name: '박박박박박박', bold: true },

	{ type: 'dot', name: '박박박박박박박', bold: false },
	{ type: 'star', name: '박박박박박박박', bold: false },
	{ type: 'dot', name: '박박박박박박박', bold: true },
	{ type: 'star', name: '박박박박박박박', bold: true },

	{ type: 'dot', name: '박박박박박박박박', bold: false },
	{ type: 'star', name: '박박박박박박박박', bold: false },
	{ type: 'dot', name: '박박박박박박박박', bold: true },
	{ type: 'star', name: '박박박박박박박박', bold: true },

	{ type: 'dot', name: '박박박박박박박박박', bold: false },
	{ type: 'star', name: '박박박박박박박박박', bold: false },
	{ type: 'dot', name: '박박박박박박박박박', bold: true },
	{ type: 'star', name: '박박박박박박박박박', bold: true },
];

function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [v, setV] = useState<Canvg>();
	const [comName, setComName] = useState<string>('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		// 👇 Store the input value to local state
		setComName(e.target.value);
	};

	const drawSeal = async (canvas: HTMLCanvasElement) => {
		const ctx = canvas.getContext('2d');
		const vRender = await Canvg.from(ctx as RenderingContext2D, seal1);
		setV(vRender);
	};

	useEffect(() => {
		if (canvasRef.current) {
			const canvas = canvasRef.current;
			drawSeal(canvas);
		}
	}, [canvasRef]);

	useEffect(() => {
		v?.start();

		return () => {
			v?.stop();
		};
	}, [v]);

	return (
		<div>
			<Flex gap={100} vertical>
				<List
					grid={{ gutter: 16, column: 4 }}
					dataSource={data}
					renderItem={(item) => (
						<List.Item>
							<SealDemo type={item.type} companyName={item.name} bold={item.bold} />
						</List.Item>
					)}
				/>
			</Flex>
		</div>
	);
}

export default App;
