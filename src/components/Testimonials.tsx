import { Star } from "lucide-react";



const TestimonialCard = ({ name, school, quote, i }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex gap-1 text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="text-slate-700 mb-6 italic">"{quote}"</p>
    <div className="flex items-center gap-3">
       <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} alt={name} />
       </div>
       <div>
         <h4 className="font-bold text-slate-900 text-sm">{name}</h4>
         <p className="text-xs text-slate-500">{school}</p>
       </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section id="stories" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Success Stories</h2>
          <p className="text-slate-600">Join thousands of happy roommates living their best semester.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard 
            name="Jordan Lee" 
            school="NYU '25" 
            quote="I was terrified of random assignment. UniNest matched me with someone who also studies late and loves jazz. Best year ever." 
            i={1}
          />
          <TestimonialCard 
            name="Sarah Chen" 
            school="UCLA '24" 
            quote="The verified student badge gave me so much peace of mind. The UI is super clean and easy to use." 
            i={2}
          />
          <TestimonialCard 
            name="Mike Ross" 
            school="Harvard Law" 
            quote="Found an apartment and a roommate in under 3 days. Highly recommend for anyone moving to a new city." 
            i={3}
          />
        </div>
      </div>
    </section>
  );
};


export default Testimonials