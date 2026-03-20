import { useState, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';

const slides = [
  {
    id: 0,
    type: 'title',
    label: '00',
    title: 'Архитектура',
    subtitle: 'Россия XIX века',
    description: 'Стили, мастера и памятники эпохи',
  },
  {
    id: 1,
    type: 'toc',
    label: '01',
    title: 'Содержание',
    items: [
      { num: '01', title: 'Стиль ампир', sub: 'Истоки и характеристики' },
      { num: '02', title: 'Петербург', sub: 'Захаров, Воронихин, Росси' },
      { num: '03', title: 'Москва', sub: 'Жилярди, Бове, восстановление' },
      { num: '04', title: 'Русско-византийский стиль', sub: 'К. А. Тон и Храм Христа Спасителя' },
    ],
  },
  {
    id: 2,
    type: 'content',
    label: '02',
    chapter: 'Стиль ампир',
    title: 'Господство классицизма',
    quote: 'Массивные, монументальные формы с богатыми украшениями — в подражание Древнему Риму периода империи.',
    body: 'В первые три десятилетия XIX в. здесь господствовал стиль ампир (от фр. empire — империя). Стиль позднего классицизма, проникнутый идеей торжества и независимости русского государства, величия империи.',
    accent: 'ампир',
  },
  {
    id: 3,
    type: 'figures',
    label: '03',
    chapter: 'Петербург',
    title: 'Мастера Северной столицы',
    figures: [
      {
        name: 'А. Д. Захаров',
        desc: 'Возвёл здание Адмиралтейства — один из главных символов имперского Петербурга.',
        works: ['Здание Адмиралтейства'],
      },
      {
        name: 'А. Н. Воронихин',
        note: 'бывший крепостной графов Строгановых',
        desc: 'Построил Казанский собор, участвовал в строительстве дворцово-парковых ансамблей Павловска и Петергофа, положил начало ансамблю Невского проспекта.',
        works: ['Казанский собор', 'Павловск и Петергоф', 'Начало ансамбля Невского проспекта'],
      },
      {
        name: 'К. И. Росси',
        desc: 'Построил Михайловский дворец (ныне Русский музей), ансамбль Дворцовой площади со зданием Генерального штаба и аркой, Александринский театр с Театральной улицей (ныне улица Зодчего Росси).',
        works: ['Михайловский дворец (Русский музей)', 'Ансамбль Дворцовой площади', 'Александринский театр', 'Улица Зодчего Росси'],
      },
    ],
  },
  {
    id: 31,
    type: 'content',
    label: '03.1',
    chapter: 'Петербург · Поздний классицизм',
    title: 'Исаакиевский собор',
    quote: 'Одним из самых поздних петербургских архитектурных памятников в стиле позднего классицизма считается Исаакиевский собор.',
    body: 'Собор возводился архитектором О. Монферраном в 1818–1858 годах. Грандиозное сооружение стало итогом развития классицизма в русской архитектуре и символом имперской мощи эпохи.',
    accent: 'О. Монферран · 1818–1858',
  },
  {
    id: 4,
    type: 'figures',
    label: '04',
    chapter: 'Москва',
    title: 'Возрождение после пожара 1812 г.',
    figures: [
      {
        name: 'Д. И. Жилярди',
        works: ['Московский университет', 'Екатерининский институт'],
      },
      {
        name: 'О. И. Бове',
        works: ['Ансамбль Большого театра', 'Театральная площадь', 'Триумфальные ворота (восстановлены в 1968 г.)'],
      },
    ],
  },
  {
    id: 5,
    type: 'content',
    label: '05',
    chapter: 'Русско-византийский стиль',
    title: 'Храм Христа Спасителя',
    quote: 'К. А. Тон — создатель русско-византийского стиля, соединившего традиции православного зодчества с академической архитектурой.',
    body: 'Проект храма Христа Спасителя стал главным памятником победы в Отечественной войне 1812 года. Разрушенный в 1931 г., собор был воссоздан в ходе реконструкции 1990-х гг. и вновь освящён в 2000 г.',
    accent: 'К. А. Тон',
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const goTo = useCallback((index: number, dir: 'next' | 'prev' = 'next') => {
    if (animating || index === current) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 320);
  }, [animating, current]);

  const next = useCallback(() => {
    if (current < slides.length - 1) goTo(current + 1, 'next');
  }, [current, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1, 'prev');
  }, [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-body text-[#1A1A1A] flex flex-col select-none overflow-hidden">

      {/* Top bar */}
      <div className="flex items-center justify-between px-10 pt-8 pb-4">
        <span className="text-xs tracking-[0.25em] uppercase text-[#999] font-body font-light">
          Архитектура России · XIX в.
        </span>
        <span className="text-xs tracking-[0.2em] text-[#999] font-body font-light">
          {current + 1} / {slides.length}
        </span>
      </div>

      {/* Progress line */}
      <div className="h-px bg-[#E0DBD5] mx-10 relative overflow-hidden">
        <div
          className="h-full bg-[#1A1A1A] transition-all duration-500 ease-out"
          style={{ width: `${((current + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-10 py-8">
        <div
          key={current}
          className={`w-full max-w-5xl transition-all duration-300 ease-out ${
            animating
              ? direction === 'next'
                ? 'opacity-0 translate-y-4'
                : 'opacity-0 -translate-y-4'
              : 'opacity-100 translate-y-0'
          }`}
          style={{ transition: 'opacity 0.32s ease, transform 0.32s ease' }}
        >

          {/* TITLE SLIDE */}
          {slide.type === 'title' && (
            <div className="flex flex-col items-start">
              <div className="w-12 h-px bg-[#1A1A1A] mb-10" />
              <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-6 font-body font-light">
                {slide.label}
              </p>
              <h1 className="font-display text-[96px] leading-none font-light text-[#1A1A1A] tracking-tight mb-4">
                {slide.title}
              </h1>
              <p className="font-display text-[40px] italic font-light text-[#888] mb-8 leading-none">
                {slide.subtitle}
              </p>
              <div className="h-px w-24 bg-[#C8C0B8] mb-6" />
              <p className="text-sm text-[#888] tracking-widest uppercase font-body font-light">
                {slide.description}
              </p>
            </div>
          )}

          {/* TOC SLIDE */}
          {slide.type === 'toc' && (
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-3 font-body font-light">{slide.label}</p>
              <h2 className="font-display text-[56px] font-light text-[#1A1A1A] mb-10 leading-tight">
                {slide.title}
              </h2>
              <div className="grid grid-cols-2 gap-px bg-[#E0DBD5]">
                {(slide.items ?? []).map((item) => (
                  <div key={item.num} className="bg-[#F7F5F2] p-8 group">
                    <p className="text-xs tracking-[0.3em] text-[#C8C0B8] mb-4 font-body">{item.num}</p>
                    <p className="font-display text-2xl font-light text-[#1A1A1A] mb-2 leading-tight">{item.title}</p>
                    <p className="text-xs text-[#999] font-body font-light tracking-wide">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTENT SLIDE */}
          {slide.type === 'content' && (
            <div className="grid grid-cols-2 gap-20 items-start">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-3 font-body font-light">{slide.chapter}</p>
                <h2 className="font-display text-[52px] font-light text-[#1A1A1A] leading-tight mb-8">
                  {slide.title}
                </h2>
                <div className="h-px bg-[#E0DBD5] mb-8" />
                <p className="text-sm text-[#666] font-body font-light leading-relaxed">
                  {slide.body}
                </p>
                {slide.accent && (
                  <div className="mt-8 inline-block">
                    <span className="text-xs tracking-[0.2em] uppercase text-[#999] border border-[#E0DBD5] px-3 py-1.5 font-body">
                      {slide.accent}
                    </span>
                  </div>
                )}
              </div>
              <div className="border-l border-[#E0DBD5] pl-10 pt-2">
                <p className="font-display text-2xl italic font-light text-[#555] leading-relaxed">
                  «{slide.quote}»
                </p>
              </div>
            </div>
          )}

          {/* FIGURES SLIDE */}
          {slide.type === 'figures' && (
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#999] mb-3 font-body font-light">{slide.chapter}</p>
              <h2 className="font-display text-[52px] font-light text-[#1A1A1A] leading-tight mb-10">
                {slide.title}
              </h2>
              <div className="grid gap-0 border-t border-[#E0DBD5]">
                {(slide.figures ?? []).map((fig, i) => (
                  <div key={i} className="grid grid-cols-[200px_1fr] gap-10 border-b border-[#E0DBD5] py-6">
                    <div>
                      <p className="font-display text-lg font-light text-[#1A1A1A] leading-tight">{fig.name}</p>
                      {fig.note && (
                        <p className="text-xs text-[#999] font-body font-light italic mt-1">{fig.note}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-3">
                      {fig.desc && (
                        <p className="text-sm text-[#555] font-body font-light leading-relaxed">{fig.desc}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {fig.works.map((w, j) => (
                          <span key={j} className="text-xs text-[#555] font-body border border-[#E0DBD5] px-3 py-1 bg-white">
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between px-10 pb-8 pt-4">
        {/* Dot indicators */}
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-6 h-1.5 bg-[#1A1A1A]'
                  : 'w-1.5 h-1.5 bg-[#C8C0B8] hover:bg-[#888]'
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-3">
          <button
            onClick={prev}
            disabled={current === 0}
            className={`w-10 h-10 border flex items-center justify-center transition-all duration-200 ${
              current === 0
                ? 'border-[#E0DBD5] text-[#C8C0B8] cursor-default'
                : 'border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F7F5F2]'
            }`}
          >
            <Icon name="ArrowLeft" size={16} />
          </button>
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className={`w-10 h-10 border flex items-center justify-center transition-all duration-200 ${
              current === slides.length - 1
                ? 'border-[#E0DBD5] text-[#C8C0B8] cursor-default'
                : 'border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F7F5F2]'
            }`}
          >
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}