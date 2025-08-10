export type Exercise = {
    id: string;
    name: string;
    primaryMuscle: string;
    equipment?: string;
    level?: 'beginner'|'intermediate'|'advanced';
    gifAsset?: number;
    gifUrl?: string;
    instructions?: string[];
    safetyTips?: string[];
};

export const EXERCISES: Exercise[] = [
    {
        id: 'bench_press_bb',
        name: 'پرس سینه با هالتر / Panca piana (bilanciere)',
        primaryMuscle: 'petto',
        equipment: 'bilanciere',
        level: 'beginner',
        gifAsset: require('@/assets/gifts/Jump-Squats-Gif.gif'),
        gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjEx/bench-press.gif', // <— sostituisci con il tuo
        instructions: [
            'سر روی نیمکت، پاها محکم روی زمین.',
            'میله را کنترل‌شده پایین بیاور تا سینه.',
            'با فشار کنترل‌شده به بالا برگرد.'
        ],
        safetyTips: ['کمر را بیش از حد قوس نده', 'از حامی (spotter) استفاده کن']
    },
    {
        id: 'squat_bb',
        name: 'اسکوات با هالتر / Squat (bilanciere)',
        primaryMuscle: 'gambe',
        equipment: 'bilanciere',
        level: 'intermediate',
        gifAsset: require('@/assets/gifts/bench-press.gif'),
        gifUrl: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjEx/squat.gif',
        instructions: [
            'پاها اندکی بازتر از عرض شانه.',
            'باسن به عقب، زانوها دنبال نوک انگشتان.',
            'تا موازی زمین پایین، سپس بالا.'
        ],
        safetyTips: ['زانوها به داخل جمع نشن', 'پشت را خنثی نگه دار'],
    }
];
