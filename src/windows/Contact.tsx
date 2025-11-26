import React from "react";
import { socials } from "#constants/index";
import WindowWrapper from "#hoc/windowWrapper";

const Contact: React.FC<{ name?: string }> = ({ name = "Mokshith" }) => {
  return (
    <div className="bg-[#F5F5F7] w-full h-full text-[#1C1C1E] rounded-xl border border-black/10 shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden">
      <div className="px-6 py-4 bg-white border-b border-black/10 flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D1D5DB] to-[#E5E7EB] 
                        flex items-center justify-center text-[#3B3B3B] text-xl font-semibold shadow-inner"
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="text-base font-semibold">{name}</div>
          <div className="text-[12px] text-[#6B7280]">Frontend Engineer</div>
        </div>

        <div className="ml-auto text-xs text-[#9CA3AF]">Contacts</div>
      </div>
      <div className="px-6 py-4 h-[calc(100%-84px)] overflow-auto">
        <div className="bg-white rounded-lg p-4 border border-black/10 shadow-sm">
          <div className="text-xs text-[#6B7280] mb-2">Social Profiles</div>

          <ul className="space-y-3">
            {socials.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-4 p-2 rounded-md hover:bg-[#F3F4F6] transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: item.bg }}
                  >
                    <img
                      src={item.icon}
                      alt={item.text}
                      className="w-5 h-5 object-contain invert-[1] brightness-0 contrast-200"
                    />
                  </div>

                  <div>
                    <div className="text-sm font-medium">{item.text}</div>
                    <div className="text-[12px] text-[#6B7280]">
                      {item.link.replace("https://", "").replace("www.", "")}
                    </div>
                  </div>
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] text-[#3B82F6] hover:underline"
                >
                  Open
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="px-6 py-3 border-t border-black/10 bg-white text-[12px] text-[#6B7280] flex items-center justify-between">
        <div>Last updated just now</div>
        <div className="text-[#9CA3AF]">iCloud</div>
      </div>
    </div>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
