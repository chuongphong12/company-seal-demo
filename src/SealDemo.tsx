import { useEffect, useRef, useState } from 'react';
import {
	DrawProps,
	SealDemoProps,
	bigCircleRadius,
	starSize,
	svgSealType1Path,
	svgSealType2Path,
	svgStarPath,
} from './constant';

const SealDemo = ({ type, companyName, bold }: SealDemoProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [canvas, setCanvas] = useState<HTMLCanvasElement>();

	const companySeal = (canvas: HTMLCanvasElement) => {
		const context = canvas.getContext('2d');

		canvas.width = 200;
		canvas.height = 200;

		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		if (context) {
			drawCircle({
				context,
				width: centerX,
				height: centerY,
				radius: bigCircleRadius,
			});
			// if (bold) {
			drawSealType({
				context,
				width: centerX,
				height: centerY,
				radius: bigCircleRadius - 33,
				bold,
			});
			// } else {
			// 	drawCircle({
			// 		context,
			// 		width: centerX,
			// 		height: centerY,
			// 		radius: bigCircleRadius - 20,
			// 	});
			// 	drawSealType1({
			// 		context,
			// 		width: centerX,
			// 		height: centerY,
			// 		radius: bigCircleRadius - 33,
			// 	});
			// }

			if (type === 'star') {
				drawStart({
					context,
					width: centerX,
					height: centerY,
					radius: bigCircleRadius,
				});
			} else {
				drawDot({
					context,
					width: centerX,
					height: centerY,
					radius: bigCircleRadius,
				});
			}
			writeCompanyName({
				context,
				width: centerX,
				height: centerY,
				name: companyName ?? '',
				radius: bigCircleRadius,
			});
		}
	};

	const drawCircle = ({ context, width, height, radius }: DrawProps) => {
		context.lineWidth = 2;
		context.strokeStyle = 'red';
		context.beginPath();
		context.arc(width, height, radius!, 0, 2 * Math.PI);
		context.stroke();
		context.closePath();
	};

	const swapElements = (array: string[], index1: number, index2: number) => {
		[array[index1], array[index2]] = [array[index2], array[index1]];
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const drawSealType1 = ({ context, width, height, radius }: DrawProps) => {
		const letters = '대표이사';
		const characters = letters.split('');
		swapElements(characters, 2, 3);

		const centerX = width / 2;
		const centerY = height / 2;

		context.save();
		context.translate(centerX, centerY);
		context.font = 'bolder 28px Solmoe KimDaeGeon';
		context.fillStyle = 'red';
		context.textAlign = 'center';

		characters.forEach((char, index) => {
			const angle = index * (Math.PI / 2) + (Math.PI / 4) * 5;

			const x = centerX + radius! * Math.cos(angle);
			const y = centerY + radius! * Math.sin(angle);
			const yOffset = 10; // Adjust the offset as needed for vertical positioning

			context.fillText(char, x, y + yOffset);
		});
		context.restore();
	};

	const drawSealType = ({ context, width, height, radius, bold }: DrawProps) => {
		const starX = width - 31;
		const starY = height - radius! - 15;

		context.save();
		context.translate(starX, starY);
		context.scale(starSize / 2.4, starSize / 2.4);

		const path2D = new Path2D(bold ? svgSealType2Path : svgSealType1Path);

		context.fillStyle = 'red';
		context.fill(path2D, 'evenodd');

		context.restore();
	};

	const drawStart = async ({ context, height, width, radius }: DrawProps) => {
		const starX = width - 6;
		const starY = height - radius! + 2;

		context.save();
		context.translate(starX, starY);
		context.scale(starSize / 2, starSize / 2);

		const path2D = new Path2D(svgStarPath);

		context.fillStyle = 'red';
		context.fill(path2D, 'evenodd');

		context.restore();
	};

	const drawDot = async ({ context, height, width, radius }: DrawProps) => {
		const dotX = width;
		const dotY = height - radius! + 10;

		context.beginPath();
		context.arc(dotX, dotY, 5, 0, 2 * Math.PI);
		context.fillStyle = 'red';
		context.fill();
		context.closePath();
	};

	const writeCompanyName = ({ context, height, width, name }: DrawProps) => {
		context.save();
		context.translate(width, height);
		context.rotate(-Math.PI / 2); // Rotate the entire text 90 degrees counterclockwise
		context.textAlign = 'center';
		context.font = 'bolder 16px SimSun';
		context.fillStyle = 'red';

		const count = name!.length;

		if (count > 1 && count === 2) {
			// If there are 2 characters, place them at specific angles
			const angle1 = (135 * Math.PI) / 180;
			const angle2 = (225 * Math.PI) / 180;

			drawRotatedText(context, name![0], angle1, 40, 0);
			drawRotatedText(context, name![1], angle2, 40, 0);
		} else {
			const startAngle = count === 1 ? (180 * Math.PI) / 180 : (45 * Math.PI) / 180;
			const endAngle = (315 * Math.PI) / 180;

			const totalAngle = endAngle - startAngle;
			const angle = totalAngle / (count - 1); // Adjusted for even spacing

			if (count === 1) {
				drawRotatedText(context, name![0], startAngle, 40, 0);
			} else {
				for (let i = 0; i < count; i++) {
					const rotationAngle = startAngle + angle * i;
					drawRotatedText(context, name![i], rotationAngle, 40, 0);
				}
			}
		}

		context.restore();
	};

	const drawRotatedText = (
		context: CanvasRenderingContext2D,
		text: string,
		rotationAngle: number,
		translateX: number,
		translateY: number
	): void => {
		context.save();
		context.rotate(rotationAngle);
		context.translate(translateX, translateY);
		context.rotate(Math.PI / 2);
		context.fillText(text, 0, 5);
		context.restore();
	};

	useEffect(() => {
		if (canvasRef.current) setCanvas(canvasRef.current);
	}, [canvasRef]);

	useEffect(() => {
		if (canvas) {
			companySeal(canvas);
		}
	}, [canvas]);

	return <canvas ref={canvasRef} />;
};

export default SealDemo;
