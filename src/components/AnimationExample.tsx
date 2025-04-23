import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import CodeBlock from './CodeBlock';

interface AnimationExampleProps {
  title: string;
  description: string;
  code: {
    javascript: string;
    css?: string;
    html?: string;
  };
  demoComponent: React.ReactNode;
}

const AnimationExample: React.FC<AnimationExampleProps> = ({
  title,
  description,
  code,
  demoComponent,
}) => {
  const exampleRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('preview');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(exampleRef.current, {
        scrollTrigger: {
          trigger: exampleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
      });
    }, exampleRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={exampleRef} className="animation-example bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden mb-12">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
        <div className="border-b border-gray-200 dark:border-gray-800">
          <TabsList className="flex">
            <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
            <TabsTrigger value="javascript" className="flex-1">JavaScript</TabsTrigger>
            {code.css && <TabsTrigger value="css" className="flex-1">CSS</TabsTrigger>}
            {code.html && <TabsTrigger value="html" className="flex-1">HTML</TabsTrigger>}
          </TabsList>
        </div>

        <TabsContent value="preview" className="p-8">
          <div className="demo-container min-h-[200px] flex items-center justify-center">
            {demoComponent}
          </div>
        </TabsContent>
        
        <TabsContent value="javascript">
          <CodeBlock code={code.javascript} language="javascript" />
        </TabsContent>
        
        {code.css && (
          <TabsContent value="css">
            <CodeBlock code={code.css} language="css" />
          </TabsContent>
        )}
        
        {code.html && (
          <TabsContent value="html">
            <CodeBlock code={code.html} language="markup" />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default AnimationExample;