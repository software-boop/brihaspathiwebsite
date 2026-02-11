type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ children, className = "" }: SectionProps) {
  return (
    <section
      className={`
        w-full 
        px-4 sm:px-6 md:px-8 lg:px-12 
        py-12 lg:py-16
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
