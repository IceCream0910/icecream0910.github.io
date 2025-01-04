"use client";
import { useState, useEffect, useRef } from "react";
import projectData from "../project/data";
import Project from "./project";
import IonIcon from '@reacticons/ionicons';

export default function ProjectsWrapper() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const tabsRef = useRef(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    const categories = ['All', ...new Set(projectData.flatMap(project =>
        Array.isArray(project.category) ? project.category : [project.category]
    ).filter(Boolean))];

    const filteredProjects = projectData.filter(project => {
        if (selectedCategory === 'All') return true;
        return Array.isArray(project.category)
            ? project.category.includes(selectedCategory)
            : project.category === selectedCategory;
    });

    const scrollTabs = (direction) => {
        const container = tabsRef.current;
        if (!container) return;

        const scrollAmount = direction === 'left' ? -200 : 200;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const checkScroll = () => {
        if (!tabsRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    };

    useEffect(() => {
        const tabsElement = tabsRef.current;
        if (tabsElement) {
            checkScroll();
            tabsElement.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);
        }

        return () => {
            if (tabsElement) {
                tabsElement.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
            }
        };
    }, []);

    return (
        <div style={{ width: '100%' }}>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
                {showLeftScroll && (
                    <>
                        <div style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            width: '100px',
                            height: '100%',
                            background: 'linear-gradient(to right, var(--background), transparent)',
                            pointerEvents: 'none',
                            zIndex: 1
                        }} />
                        <button
                            onClick={() => scrollTabs('left')}
                            style={{
                                position: 'absolute',
                                left: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                background: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <IonIcon name="chevron-back" />
                        </button>
                    </>
                )}
                {showRightScroll && (
                    <>
                        <div style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            width: '100px',
                            height: '100%',
                            background: 'linear-gradient(to left, var(--background), transparent)',
                            pointerEvents: 'none',
                            zIndex: 1
                        }} />
                        <button
                            onClick={() => scrollTabs('right')}
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                background: 'rgba(0,0,0,0.5)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '30px',
                                height: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                            }}
                        >
                            <IonIcon name="chevron-forward" />
                        </button>
                    </>
                )}
                <div
                    ref={tabsRef}
                    style={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: '10px',
                        padding: '10px',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '::-webkit-scrollbar': { display: 'none' }
                    }}
                >
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                border: 'none',
                                background: selectedCategory === category
                                    ? 'var(--card)'
                                    : 'var(--background)',
                                color: selectedCategory === category
                                    ? 'var(--text)'
                                    : 'var(--text)',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{
                display: 'grid',
                gap: '20px',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
            }}>
                {filteredProjects.map((project, index) => (
                    <Project key={index} {...project} />
                ))}
            </div>
        </div>
    );
}