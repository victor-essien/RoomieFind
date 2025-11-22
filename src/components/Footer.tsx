const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">U</div>
                <span className="text-xl font-bold text-slate-900">UniNest</span>
             </div>
             <p className="text-slate-500 max-w-xs leading-relaxed">
               Making student living simpler, safer, and more social. Built by students, for students.
             </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
              <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-600">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600">Guidelines</a></li>
              <li><a href="#" className="hover:text-indigo-600">Safety</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-100 text-sm text-slate-400">
          <p>&copy; 2024 UniNest Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-600">Twitter</a>
            <a href="#" className="hover:text-indigo-600">Instagram</a>
            <a href="#" className="hover:text-indigo-600">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer